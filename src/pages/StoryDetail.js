import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";

import Modal from "../components/common/Modal";
import SubHeader from "../components/common/SubHeader";
import StyledLoadingSpinner from "../components/shared/StyledLoadingSpinner";
import {
  STORY_SUB_HEADER_HEADING,
  STORY_SUB_HEADER_PARAGRAPH,
  STORY_ACCEPT_SUCCESS_MESSAGE,
} from "../constants/story";

function StoryDetail() {
  const { counsel_id } = useParams();

  const userId = useSelector(({ user }) => user.data._id);

  const [story, setStory] = useState(null);
  const [modalMessage, setModalMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleClickMemoized = useCallback(handleClick, [userId]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels/${counsel_id}`,
          {
            withCredentials: true,
          }
        );

        setStory(data.data);
        setIsLoading(false);
      } catch (err) {
        setModalMessage(err.response.data.message);
        setIsLoading(false);
      }
    })();
  }, [setStory]);

  async function handleClick() {
    try {
      await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels/${counsel_id}/counselors`,
        userId,
        {
          withCredentials: true,
        }
      );

      setModalMessage(STORY_ACCEPT_SUCCESS_MESSAGE);
    } catch (err) {
      setModalMessage(err.response.data.message);
      setIsLoading(false);
    }
  }

  return (
    <>
      <SubHeader
        heading={STORY_SUB_HEADER_HEADING}
        paragraph={STORY_SUB_HEADER_PARAGRAPH}
      />
      <MainContainer>
        {isLoading && <StyledLoadingSpinner />}
        {!isLoading && modalMessage && (
          <Modal onClick={setModalMessage} width="50rem" height="20rem">
            {modalMessage}
          </Modal>
        )}
        {!isLoading && !modalMessage && story ? (
          <>
            <section>
              <StoryHeaderWrapper>
                <ImageWrapper>
                  <img src={story.counselee.imageURL} alt="Profile Image" />
                </ImageWrapper>
                <StoryInfoWrapper>
                  <div className="name">{story.counselee.nickname}</div>
                  <div className="title">{story.title}</div>
                  <div className="tags">
                    {story.tag.map((tag) => {
                      return <Tag key={tag}>#{tag}</Tag>;
                    })}
                  </div>
                </StoryInfoWrapper>
              </StoryHeaderWrapper>
              <StoryBodyWrapper>
                <p>{story.content}</p>
              </StoryBodyWrapper>
            </section>
            <aside>
              <AsideWrapper>
                <ButtonWrapper>
                  <button onClick={handleClickMemoized}>사연 수락하기</button>
                </ButtonWrapper>
              </AsideWrapper>
            </aside>
          </>
        ) : null}
      </MainContainer>
    </>
  );
}

const MainContainer = styled.section`
  display: flex;
  justify-content: center;
  width: 80%;
  min-height: 100vh;
  margin: 0 auto;
  section {
    flex-basis: 70%;
    height: 100%;
  }
  aside {
    flex-basis: 30%;
    height: 100%;
  }
`;

const StoryHeaderWrapper = styled.div`
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

const StoryInfoWrapper = styled.div`
  width: 100%;
  margin: auto;
  font-size: 2.5rem;
  text-align: center;
  line-height: 6rem;
  .name {
    font-size: 3rem;
    color: #3e005b;
  }
`;

const Tag = styled.span`
  margin: 0 1rem;
`;

const StoryBodyWrapper = styled.div`
  width: 90%;
  height: 70%;
  padding: 5rem;
  margin: 0 auto;
  margin-top: 3rem;
  border: 0.8rem solid #bfaea4;
  border-radius: 3rem;
  font-size: 2.5rem;
  overflow-y: auto;
`;

const AsideWrapper = styled.div`
  width: 90%;
  height: 92.5%;
  min-height: 92.5%;
  margin: 0 auto;
  margin-top: 3rem;
  border: 0.8rem solid #bfaea4;
  border-radius: 3rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  button {
    font-size: 3.5rem;
    padding: 1rem;
    border-radius: 3rem;
  }
`;

export default StoryDetail;
