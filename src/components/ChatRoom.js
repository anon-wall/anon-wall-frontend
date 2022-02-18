import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Peer from "simple-peer";
import io from "socket.io-client";
import styled from "styled-components";
import { differenceInSeconds } from "date-fns";

import Modal from "./common/Modal";
import Video from "./Video";
import useFetch from "../hooks/useFetch";
import StyledLoadingSpinner from "./shared/StyledLoadingSpinner";

function ChatRoom() {
  const { counsel_id: roomId } = useParams();

  const loggedInUserId = useSelector(({ user }) => user.data._id);

  const {
    data: counsel,
    error: fetchError,
    loading: isLoading,
  } = useFetch(
    `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels/${roomId}`
  );

  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOn, setIsModalOn] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);

  const [peers, setPeers] = useState([]);
  const [stream, setStream] = useState(null);
  const socketRef = useRef(null);
  const myVideo = useRef();
  const peersRef = useRef([]);

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);

  const cameraText = isCameraOn ? "Camera On" : "Camera Off";
  const muteText = isAudioOn ? "Unmute" : "Mute";

  useEffect(() => {
    if (!counsel) {
      return;
    }

    socketRef.current = io.connect(process.env.REACT_APP_LOCAL_SERVER_URL);
    const { current: socket } = socketRef;

    let streamPointer;

    (async () => {
      const myStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      myStream.getTracks().forEach((track) => (track.enabled = !track.enabled));

      myVideo.current.srcObject = myStream;
      streamPointer = myStream;

      setStream(myStream);

      socket.emit("joinRoom", roomId, loggedInUserId);

      socket.on("accessAuthorization", (isAuthorized) => {
        streamPointer.getTracks().forEach((track) => track.stop());

        setErrorMessage(isAuthorized);
        setIsModalOn(!!isAuthorized);
        setStream(null);
        setPeers([]);

        socket.emit("leaveRoom", roomId);
      });

      socket.on("currentUsers", (users) => {
        const peers = [];

        users.forEach((userId) => {
          const peer = createPeer(userId[0], socket.id, myStream);

          peersRef.current.push({
            peer,
            peerID: userId[0],
          });

          peers.push({
            peer,
            peerID: userId[0],
          });
        });

        setPeers(peers);
      });

      socket.on("newUserJoined", ({ signal, callerID }) => {
        const peer = addPeer(signal, callerID, myStream);
        const peerObj = {
          peer,
          peerID: callerID,
        };

        peersRef.current.push(peerObj);

        setPeers((users) => [...users, peerObj]);
      });

      socket.on("receivingReturnedSignal", (payload) => {
        const item = peersRef.current.find((p) => p.peerID === payload.id);

        item.peer.signal(payload.signal);
      });

      socket.on("userLeft", (id) => {
        const peerObj = peersRef.current.find((p) => p.peerID === id);
        const peers = peersRef.current.filter((p) => p.peerID !== id);

        peersRef.current = peers;

        if (peerObj) {
          peerObj.peer.destroy();
        }

        setPeers((peers) => peers.filter((peer) => peer.peerID !== id));
      });
    })();

    let timerId = setTimeout(function tick() {
      const difference = differenceInSeconds(
        new Date(counsel.endDate),
        new Date()
      );

      if (difference <= 60) {
        setRemainingTime(Math.floor(difference));
      }

      if (difference <= 0) {
        peersRef.current = [];
        streamPointer.getTracks().forEach((track) => track.stop());

        setPeers([]);
        setStream(null);
        setIsModalOn(true);
        setErrorMessage("제한시간이 초과되어 상담이 종료되었습니다.");

        return;
      }

      timerId = setTimeout(tick, 1000);
    }, 1000);

    return () => {
      peersRef.current = [];

      clearTimeout(timerId);

      streamPointer.getTracks().forEach((track) => track.stop());
      socket.emit("leaveRoom", roomId);
      socket.removeAllListeners("currentUsers");
      socket.removeAllListeners("userJoined");
      socket.removeAllListeners("receivingReturnedSignal");
      socket.off();
    };
  }, [counsel]);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sendingSignal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returningSignal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  function handleClickMuteButton() {
    stream
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setIsAudioOn((value) => !value);
  }

  function handleClickCameraButton() {
    stream
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setIsCameraOn((value) => !value);
  }

  return (
    <>
      {isLoading && <StyledLoadingSpinner />}
      {!isLoading && (errorMessage || fetchError) && isModalOn && (
        <Modal onClick={setIsModalOn} width="40rem" height="20rem">
          {errorMessage || fetchError}
        </Modal>
      )}
      {!isLoading && !errorMessage && (
        <ChatRoomContainer>
          <VideoContainer>
            <div className="myVideo">
              <StyledVideo playsInline muted ref={myVideo} autoPlay />
            </div>
            {peers?.map((peer) => {
              return (
                <div className="myVideo" key={peer.peerID}>
                  <Video
                    playsInline
                    key={peer.peerID}
                    peer={peer.peer}
                    autoPlay
                  />
                </div>
              );
            })}
          </VideoContainer>
          <ButtonContainer>
            <Button onClick={handleClickCameraButton}>{cameraText}</Button>
            <Button onClick={handleClickMuteButton}>{muteText}</Button>
            {remainingTime <= 60 && (
              <RemainingTimeWrapper>
                남은시간: {remainingTime}
              </RemainingTimeWrapper>
            )}
          </ButtonContainer>
        </ChatRoomContainer>
      )}
    </>
  );
}

const ChatRoomContainer = styled.div`
  height: 100vh;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 5rem 4rem;
`;

const VideoContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 10rem;
  margin-top: 10rem;
  padding-left: 3rem;
  border: 0.7rem solid #bfaea4;
  border-radius: 5rem;
`;

const StyledVideo = styled.video`
  border: 1px solid blue;
  width: 100%;
  height: 100%;
`;

const Button = styled.button`
  width: 10rem;
  height: 5rem;
  margin: 0 10px;
  padding: 5px;
  background-color: #95bcf0;
  border-radius: 3rem;
  border: none;
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  cursor: pointer;
`;

const RemainingTimeWrapper = styled.div`
  margin-left: 10rem;
  font-size: 2rem;
  font-weight: bolder;
`;

export default ChatRoom;
