import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import Modal from "../components/common/Modal";
import StyledLoadingSpinner from "../components/shared/StyledLoadingSpinner";
import StyledTransparentButton from "../components/shared/StyledTransparentButton";
import ReservationList from "../components/ReservationList";
import WeekDayScheduler from "../components/WeekDayScheduler";
import DailyScheduler from "../components/DailyScheduler";
import {
  getCounselorInfo,
  updateCounselorInfo,
} from "../features/counselorSlice";
import {
  RESTRICT_REGEX,
  INPUT_TAG,
  FAMILY_TITLE,
  SHORT_INPUT,
  LONG_INPUT,
} from "../constants/upload";

function MyPageCounselor() {
  const dispatch = useDispatch();
  const userId = useSelector(({ user }) => user.data._id);
  const counselorInfo = useSelector((state) => state.counselor.data);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const [newCounselorInfo, setNewCounselorInfo] = useState({});

  useEffect(() => {
    setIsLoading(false);
    dispatch(getCounselorInfo(userId));
  }, []);

  useEffect(() => {
    setNewCounselorInfo({
      familyTitle: counselorInfo.familyTitle,
      shortInput: counselorInfo.shortInput,
      longInput: counselorInfo.longInput,
      tag: counselorInfo.tag,
    });
  }, [isChanged]);

  function handleChangeTitle(familyTitle) {
    setNewCounselorInfo((info) => ({
      ...info,
      familyTitle,
    }));
  }

  function handleChangeShortInput(shortInput) {
    setNewCounselorInfo((info) => ({
      ...info,
      shortInput,
    }));
  }

  function handleChangeLongInput(longInput) {
    setNewCounselorInfo((info) => ({
      ...info,
      longInput,
    }));
  }

  function handleChangeTag(tag) {
    const reg = /[`~!@#$%^&*()_|+\-=?;:'".<>\{\}\[\]\\\/ ]/gim;

    if (tag.search(reg) > -1) {
      setErrorMessage(RESTRICT_REGEX);
    }

    setNewCounselorInfo((info) => ({
      ...info,
      tag: tag.replace(reg, "").split(","),
    }));
  }

  function handleOnKeyDown(e) {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  function handleChangeButton() {
    setIsChanged((bool) => !bool);
  }

  function handleSubmitNewInfo() {
    handleChangeButton();
    dispatch(
      updateCounselorInfo({
        userId,
        newCounselorInfo,
      })
    );
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
        <InfoContainer>
          {!isChanged ? (
            <InfoWrapper>
              <div>호칭: {counselorInfo.familyTitle}</div>
              <div>
                태그:
                {counselorInfo.tag.map((tag) => (
                  <span className="tag" key={tag}>
                    #{tag}
                  </span>
                ))}
              </div>
              <div>한줄 소개: {counselorInfo.shortInput}</div>
              <div>긴줄 소개: {counselorInfo.longInput}</div>
            </InfoWrapper>
          ) : (
            <InfoFormWrapper>
              <div>
                <label htmlFor="familyTitle">호칭 입력:</label>
                <input
                  id="familyTitle"
                  type="text"
                  placeholder={FAMILY_TITLE}
                  onChange={(e) => handleChangeTitle(e.target.value)}
                  value={newCounselorInfo.familyTitle}
                />
              </div>
              <div>
                <label htmlFor="tags">태그 입력:</label>
                <input
                  id="tags"
                  type="text"
                  placeholder={INPUT_TAG}
                  onChange={(e) => handleChangeTag(e.target.value)}
                  value={newCounselorInfo.tag?.join()}
                />
              </div>
              <div>
                <label htmlFor="short-input">한줄 소개:</label>
                <input
                  id="short-input"
                  type="text"
                  placeholder={SHORT_INPUT}
                  onChange={(e) => handleChangeShortInput(e.target.value)}
                  value={newCounselorInfo.shortInput}
                />
              </div>
              <div>
                <label htmlFor="long-input">긴줄 소개:</label>
                <textarea
                  id="long-input"
                  type="text"
                  placeholder={LONG_INPUT}
                  onChange={(e) => handleChangeLongInput(e.target.value)}
                  onKeyDown={handleOnKeyDown}
                  value={newCounselorInfo.longInput}
                />
              </div>
            </InfoFormWrapper>
          )}
          <div className="button-container">
            {!isChanged ? (
              <StyledTransparentButton onClick={handleChangeButton}>
                수정하기
              </StyledTransparentButton>
            ) : (
              <StyledTransparentButton onClick={handleSubmitNewInfo}>
                저장하기
              </StyledTransparentButton>
            )}
          </div>
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
        <ScheduleContainer>
          <WeekDayScheduler />
          <DailyScheduler />
        </ScheduleContainer>
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
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 90%;
  min-height: 25rem;
  margin: 0 auto;
  margin-top: 3rem;
  border: 0.5rem solid #c9bab2;
  border-radius: 3rem;

  button {
    width: 8rem;
    padding: 5px;
    margin: 0 10px;
    border-radius: 3rem;
    background-color: #95bcf0;
    font-size: ${({ theme }) => theme.fontSizes.mmm};
    color: white;
    cursor: pointer;
  }
`;

const InfoWrapper = styled.div`
  width: 50%;
  padding-left: 1.5rem;
  line-height: 3rem;
  font-size: 1.5rem;

  #tag {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;

const InfoFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding-left: 1.5rem;
  line-height: 3rem;

  div {
    display: flex;
    margin-bottom: 0.5rem;
  }

  label {
    font-size: ${({ theme }) => theme.fontSizes.mmm};
  }

  input,
  textarea {
    width: 80%;
    padding-left: 5px;
    margin-left: 1rem;
    min-height: 3rem;
    border: none;
    border-bottom: 1px solid black;
  }

  textarea {
    min-height: 7rem;
    resize: none;
  }
`;

const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  min-height: 20rem;
  padding: 3rem;
  margin: 0 auto;
  margin-top: 3rem;
  border: 0.5rem solid #c9bab2;
  border-radius: 3rem;
`;

export default MyPageCounselor;
