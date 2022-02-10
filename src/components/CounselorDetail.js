import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import ReservationDate from "./ReservationDate";
import SubHeader from "./common/SubHeader";
import StyledLoadingSpinner from "./shared/StyledLoadingSpinner";
import Modal from "./common/Modal";
import {
  STORY_SUB_HEADER_HEADING,
  STORY_SUB_HEADER_PARAGRAPH,
} from "../constants/story";

function CounselorDetail() {
  const { user_id } = useParams();

  const [counselor, setCounselor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/users/${user_id}`,
          {
            withCredentials: true,
          }
        );

        setCounselor(data.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setErrorMessage(err.response.data.message);
      }
    })();
  }, [setCounselor, setIsLoading, setErrorMessage]);

  return (
    <>
      <SubHeader
        heading={STORY_SUB_HEADER_HEADING}
        paragraph={STORY_SUB_HEADER_PARAGRAPH}
      />
      <MainContainer>
        {isLoading && <StyledLoadingSpinner />}
        {!isLoading && errorMessage && (
          <Modal onClick={setErrorMessage} width="50rem" height="20rem">
            {errorMessage}
          </Modal>
        )}
        {!isLoading && !errorMessage && counselor && (
          <>
            <section>
              <CounselorHeaderWrapper>
                <ImageWrapper>
                  <img />
                </ImageWrapper>
                <CounselorInfoWrapper>
                  <div className="name">
                    {counselor.nickname} {counselor.counselor.familyTitle}
                  </div>
                  <div className="tags">
                    {counselor.counselor.tag.map((tag) => {
                      return <Tag key={tag}>#{tag}</Tag>;
                    })}
                  </div>
                  <div className="short">{counselor.counselor.shortInput}</div>
                  <div className="long">{counselor.counselor.longInput}</div>
                </CounselorInfoWrapper>
              </CounselorHeaderWrapper>
              <InstructionWrapper>
                <div>
                  <p>
                    1. 하나의 고민 담벼락은 한명의 카운슬러만 배정될 수
                    있습니다.
                  </p>
                  <p>2. 카운슬러의 예약 시간을 확인하여 예약을 시작하세요.</p>
                  <p>3. 예약 시간이 되면 나의 담벼락에서 입장할 수 있습니다.</p>
                  <p>
                    4. 익명으로 진행되나 선택에 따라서 영상 통화로도 이용이
                    가능합니다.
                  </p>
                </div>
              </InstructionWrapper>
            </section>
            <ReservationDate counselor={counselor} />
          </>
        )}
      </MainContainer>
    </>
  );
}

const MainContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 70%;
  min-height: 100vh;
  margin: 0 auto;

  section {
    flex-basis: 70%;
  }
`;

const CounselorHeaderWrapper = styled.div`
  display: flex;
  width: 90%;
  height: 20%;
  margin: 0 auto;
  margin-top: 3rem;
  border: 0.8rem solid #bfaea4;
  border-radius: 3rem;
  overflow: scroll;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30rem;
  height: 100%;
  background-color: #000000;

  img {
    width: 20rem;
    height: 20rem;
    border-radius: 50%;
    background-color: #ffffff;
  }
`;

const CounselorInfoWrapper = styled.div`
  width: 100%;
  margin: auto;
  font-size: 2.25rem;
  text-align: center;
  line-height: 3rem;

  .name {
    font-size: 3rem;
    color: #3e005b;
  }

  .tags {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;

const Tag = styled.span`
  margin: 0 1rem;
`;

const InstructionWrapper = styled.div`
  width: 90%;
  min-height: 300px;
  padding: 5rem;
  margin: 0 auto;
  margin-top: 3rem;
  border: 0.8rem solid #bfaea4;
  border-radius: 3rem;
  font-size: 2.5rem;

  div {
    position: relative;
    width: fit-content;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export default CounselorDetail;
