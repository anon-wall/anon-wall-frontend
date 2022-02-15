import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import Modal from "../components/common/Modal";
import StyledLoadingSpinner from "../components/shared/StyledLoadingSpinner";
import ReservationList from "../components/ReservationList";
import WeekDayScheduler from "../components/WeekDayScheduler";
import DailyScheduler from "../components/DailyScheduler";
import { getCounselorInfo } from "../features/counselorSlice";

function MyPageCounselor() {
  const dispatch = useDispatch();
  const userId = useSelector(({ user }) => user.data._id);
  const counselorInfo = useSelector((state) => state.counselor.data);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setIsLoading(false);
    dispatch(getCounselorInfo(userId));
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
            <div>호칭 입력: {counselorInfo.familyTitle}</div>
            <div>
              태그 입력:
              {counselorInfo.tag.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
            <div>한줄 소개: {counselorInfo.shortInput}</div>
            <div>긴줄 소개: {counselorInfo.longInput}</div>
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
          <DailyScheduler />
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
  border: 0.5rem solid #c9bab2;
  border-radius: 3rem;
  overflow: scroll;
`;

const InfoWrapper = styled.div`
  width: 100%;
  margin: auto;
  font-size: 1.7rem;
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 50px;
  width: 90%;
  min-height: 20rem;
  margin: 0 auto;
  margin-top: 3rem;
  border: 0.5rem solid #c9bab2;
  border-radius: 3rem;
  overflow: scroll;
`;

export default MyPageCounselor;
