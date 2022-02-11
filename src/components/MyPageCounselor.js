import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
// import axios from "axios";

import Modal from "./common/Modal";
import StyledLoadingSpinner from "./shared/StyledLoadingSpinner";
import ReservationList from "./ReservationList";
import WeekDayScheduler from "./WeekDayScheduler";

function MyPageCounselor() {
  const { _id: userId, counselor } = useSelector((state) => state.user.data);

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
        <InfoContainer>
          <InfoWrapper>
            <div>호칭 입력: {counselor.familyTitle}</div>
            <div>
              태그 입력:
              {counselor.tag.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
            <div>한줄 소개: {counselor.shortInput}</div>
            <div>긴줄 소개: {counselor.longInput}</div>
          </InfoWrapper>
        </InfoContainer>
        <div className="sub-title">
          <h2>예약 현황</h2>
        </div>
        <ReservationList
          payload={{
            userId,
            type: "counselor",
          }}
          onError={setErrorMessage}
        />
        <div className="sub-title">
          <h2>스케줄 관리</h2>
        </div>
        <SchduleContainer>
          <WeekDayScheduler />
        </SchduleContainer>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 90%;
  min-height: 100vh;

  .sub-title {
    h2 {
      position: relative;
      margin-top: 3rem;
      left: 3em;
    }
  }
`;

const InfoContainer = styled.div`
  display: flex;
  width: 90%;
  min-height: 20rem;
  margin: 0 auto;
  margin-top: 3rem;
  border: 0.8rem solid #bfaea4;
  border-radius: 3rem;
  overflow: scroll;
`;

const InfoWrapper = styled.div`
  width: 100%;
  margin: auto;
  font-size: 2.25rem;
  line-height: 3rem;

  div {
    padding-left: 10%;
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

const SchduleContainer = styled.div`
  width: 90%;
  min-height: 20rem;
  margin: 0 auto;
  margin-top: 3rem;
  border: 0.8rem solid #bfaea4;
  border-radius: 3rem;
  overflow: scroll;
`;

export default MyPageCounselor;
