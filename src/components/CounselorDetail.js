import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { getCounselor } from "../api/axios";
import ReservationDate from "./ReservationDate";
import SubHeader from "./common/SubHeader";
import StyledLoadingSpinner from "./shared/StyledLoadingSpinner";
import Modal from "./common/Modal";
import ImageWrapper from "./shared/ImageWrapper";
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
        const { data } = await getCounselor(user_id);

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
                  <img src={counselor.imageURL} alt="Profile Image" />
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
                  <div className="short">
                    ?????? ??????: {counselor.counselor.shortInput}
                  </div>
                  <div className="long">
                    ?????? ??????: {counselor.counselor.longInput}
                  </div>
                </CounselorInfoWrapper>
              </CounselorHeaderWrapper>
              <InstructionWrapper>
                <div>
                  <p>
                    1. ????????? ?????? ???????????? ????????? ??????????????? ????????? ???
                    ????????????.
                  </p>
                  <p>2. ??????????????? ?????? ????????? ???????????? ????????? ???????????????.</p>
                  <p>3. ?????? ????????? ?????? ?????? ??????????????? ????????? ??? ????????????.</p>
                  <p>
                    4. ???????????? ???????????? ????????? ????????? ?????? ???????????? ?????????
                    ???????????????.
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

const CounselorInfoWrapper = styled.div`
  width: 100%;
  margin: auto;
  font-size: 1.7rem;
  line-height: 3rem;
  padding-left: 70px;

  .name {
    padding: 10px;
    font-size: 2.7rem;
    font-weight: bold;
    color: #3e005b;
  }

  .tags {
    padding-top: 20px 0;
  }

  .short,
  .long {
    margin: 1rem;
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
  font-size: 1.7rem;
  line-height: 4rem;

  div {
    position: relative;
    width: fit-content;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export default CounselorDetail;
