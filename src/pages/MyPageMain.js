import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";

import StyledLoadingSpinner from "../components/shared/StyledLoadingSpinner";
import Modal from "../components/common/Modal";
import ReservationList from "../components/ReservationList";

function MyPageMain() {
  const {
    _id: userId,
    nickname,
    email,
    imageURL,
  } = useSelector((state) => state.user.data);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  async function handleChangeNotifiation() {
    try {
      await axios.patch(
        `${process.env.REACT_APP_LOCAL_SERVER_URL}/users/${userId}`
      );
    } catch (err) {
      setErrorMessage(err.data.message);
    }
  }

  return (
    <>
      <MainContainer>
        {isLoading && <StyledLoadingSpinner />}
        {!isLoading && errorMessage && (
          <Modal onClick={setErrorMessage} width="50rem" height="20rem">
            {errorMessage}
          </Modal>
        )}
        <MyInfoContainer>
          <ImageWrapper>
            <img src={imageURL} />
          </ImageWrapper>
          <MyInfoWrapper>
            <div className="name">{nickname}</div>
            <div className="email">{email}</div>
            <div className="notification">
              <select onChange={handleChangeNotifiation}>
                <option value="10">10분</option>
                <option value="30">30분</option>
                <option value="60">1시간</option>
                <option value="120">2시간</option>
                <option value="180">3시간</option>
                <option value="360">6시간</option>
                <option value="720">12시간</option>
                <option value="1440">24시간</option>
              </select>
            </div>
          </MyInfoWrapper>
        </MyInfoContainer>
        <div className="reservation-label">
          <h2>예약 현황</h2>
        </div>
        <ReservationList
          payload={{
            userId,
            type: "counselee",
          }}
          onError={setErrorMessage}
        />
      </MainContainer>
    </>
  );
}

const MainContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 90%;
  min-height: 100vh;

  .reservation-label {
    h2 {
      position: relative;
      margin-top: 3rem;
      left: 3em;
    }
  }
`;

const MyInfoContainer = styled.div`
  display: flex;
  width: 90%;
  min-height: 20rem;
  margin: 0 auto;
  margin-top: 3rem;
  border: 0.5rem solid #c9bab2;
  border-radius: 3rem;
  overflow: scroll;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  min-height: 100%;

  img {
    width: 15rem;
    height: 15rem;
    border-radius: 50%;
    background-color: #ffffff;
  }
`;

const MyInfoWrapper = styled.div`
  width: 100%;
  margin: auto;
  font-size: 2.25rem;
  line-height: 3rem;

  div {
    padding-left: 30%;
  }

  .name {
    font-size: 3rem;
    color: #3e005b;
  }

  .tags {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;

export default MyPageMain;
