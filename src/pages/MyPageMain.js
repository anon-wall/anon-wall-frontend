import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import StyledLoadingSpinner from "../components/shared/StyledLoadingSpinner";
import Modal from "../components/common/Modal";
import ReservationList from "../components/ReservationList";
import StyledBorderCard from "../components/shared/StyledBorderCard";

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
      padding-left: 3em;
      margin-top: 3rem;
    }
  }
`;

const MyInfoContainer = styled(StyledBorderCard)`
  display: flex;
  width: 90%;
  min-height: 20rem;
  margin: 0 auto;
  margin-top: 3rem;
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
    padding-left: 20%;
  }

  .name {
    font-size: ${({ theme }) => theme.fontSizes.lll};
    color: #3e005b;
  }

  .email {
    font-size: ${({ theme }) => theme.fontSizes.l};
  }

  .tags {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  .notification {
    font-size: 1.2rem;
  }
`;

export default MyPageMain;
