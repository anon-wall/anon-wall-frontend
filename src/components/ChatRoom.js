import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Peer from "simple-peer";
import io from "socket.io-client";
import styled from "styled-components";

const socket = io.connect("http://localhost:8000");

function ChatRoom() {
  const { counsel_id } = useParams();
  const myData = useSelector(({ user }) => user.data);

  const [myId, setMyId] = useState("");
  const [stream, setStream] = useState();
  const [caller, setCaller] = useState({});
  const [idToCall, setIdToCall] = useState("");
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const [cameraButton, setCameraButton] = useState(false);
  const [audioButton, setAudioButton] = useState(false);

  const cameraText = cameraButton ? "Camera Off" : "Camera On";
  const muteText = audioButton ? "Mute" : "Unmute";

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        const myStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        setStream(myStream);
        myVideo.current.srcObject = myStream;
      } catch (err) {
        console.log(err);
      }
    })();

    socket.on("me", (id) => {
      console.log("my id", id);
      setMyId(id);
    });

    socket.emit("joinRoom", counsel_id);

    socket.on("otherUserId", (id) => {
      setIdToCall(id);
      setCallAccepted(false);
    });

    socket.on("sendCall", (data) => {
      setCaller({
        nickname: data.nickname,
        isReceivedCall: true,
        from: data.from,
        signal: data.signal,
      });
    });
    socket.on("someoneLeft", () => {
      setCallEnded(true);
      connectionRef.current.destroy();
    });
  }, []);

  function callUser(id) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("sendCall", {
        userToCall: id,
        signal: data,
        from: myId,
        nickname: myData.nickname,
      });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  }

  function answerCall() {
    setCallAccepted(true);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller.from });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(caller.signal);

    connectionRef.current = peer;
  }

  function leaveCall() {
    setCallEnded(true);

    socket.emit("leaveRoom", counsel_id);

    connectionRef.current.destroy();
  }

  function handleClickMuteButton() {
    stream
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setAudioButton((value) => !value);
  }

  function handleClickCameraButton() {
    stream
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setCameraButton((value) => !value);
  }

  return (
    <>
      <ChatRoomContainer>
        <VideoContainer>
          <div className="myVideo">
            {stream && (
              <>
                <Video
                  playsInline
                  muted
                  ref={myVideo}
                  autoPlay
                  style={{ width: "60rem", height: "40rem" }}
                />
              </>
            )}
          </div>
          <div className="userVideo">
            {callAccepted && !callEnded ? (
              <Video
                playsInline
                ref={userVideo}
                autoPlay
                style={{ width: "60rem", height: "40rem" }}
              />
            ) : null}
          </div>
        </VideoContainer>
        <ButtonContainer>
          <Button onClick={handleClickCameraButton}>{cameraText}</Button>
          <Button onClick={handleClickMuteButton}>{muteText}</Button>
          <div>
            {caller.isReceivedCall && !callAccepted ? (
              <div className="only counselee button">
                <Button onClick={answerCall}>Answer</Button>
                {caller.name} is calling...
              </div>
            ) : null}
          </div>
          <div className="end-button">
            {callAccepted && !callEnded && (
              <Button onClick={leaveCall}>End Call</Button>
            )}
          </div>
          {idToCall && !callAccepted ? (
            <div className="only counselor button">
              <Button onClick={() => callUser(idToCall)}>상담 시작하기</Button>
              {idToCall}님이 입장하셨습니다.
            </div>
          ) : null}
        </ButtonContainer>
      </ChatRoomContainer>
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
  justify-content: space-around;
  width: 100%;

  .video {
    border: 0.7rem solid #bfaea4;
    border-radius: 5rem;
  }
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

const Video = styled.video`
  border: 1px solid blue;
  width: 50%;
  height: 50%;
`;

const Button = styled.button`
  width: 10rem;
  height: 5rem;
`;

export default ChatRoom;
