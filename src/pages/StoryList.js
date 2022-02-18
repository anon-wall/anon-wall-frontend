import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";

import { getCounselList } from "../api/axios";
import StyledLoadingSpinner from "../components/shared/StyledLoadingSpinner";
import SubHeader from "../components/common/SubHeader";
import Modal from "../components/common/Modal";
import StoryListEntry from "../components/StoryListEntry";
import SearchBar from "../components/SearchBar";
import {
  STORY_SUB_HEADER_HEADING,
  STORY_SUB_HEADER_PARAGRAPH,
  STORY_RESULT_MESSAGE,
} from "../constants/story";

function StoryList() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  const [storyList, setStoryList] = useState([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [hasPage, setHasPage] = useState({
    prev: false,
    next: false,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getCounselList({
          options: {
            params: { page, limit: 6, tag: keyword },
            withCredentials: true,
          },
        });

        setStoryList(data.data.counsels);
        setIsLoading(false);
        setHasPage({
          ...hasPage,
          prev: data.data.hasPrevPage,
          next: data.data.hasNextPage,
        });
      } catch (err) {
        setIsLoading(false);
        setErrorMessage(err.response.data.message);
      }
    })();
  }, [page, keyword]);

  function handleClickPrevButton() {
    setPage((page) => page - 1);
    setIsLoading(true);
    setStoryList([]);
  }

  function handleClickNextButton() {
    setPage((page) => page + 1);
    setIsLoading(true);
    setStoryList([]);
  }

  function handleSearchKeyword(keyword) {
    setKeyword(keyword);
    setIsLoading(true);
    setStoryList([]);
    setPage(1);
  }

  return (
    <>
      {!isLoading && errorMessage && (
        <Modal onClick={setErrorMessage} width="50rem" height="20rem">
          <p>{errorMessage}</p>
        </Modal>
      )}
      <SubHeader
        heading={STORY_SUB_HEADER_HEADING}
        paragraph={STORY_SUB_HEADER_PARAGRAPH}
      />
      <SearchBar onSubmitKeyword={handleSearchKeyword} />
      {isLoading && (
        <CenterContainer>
          <StyledLoadingSpinner />
        </CenterContainer>
      )}
      {!isLoading && !storyList.length && (
        <CenterContainer>
          <p className="result-text">{STORY_RESULT_MESSAGE}</p>
        </CenterContainer>
      )}
      <Container>
        <div className="indicator-wrapper">
          {hasPage.prev && !isLoading && (
            <Icon
              icon="akar-icons:arrow-left"
              style={{ fontSize: "5rem" }}
              onClick={handleClickPrevButton}
            />
          )}
        </div>
        <StoryListContainer>
          {storyList?.map(({ _id, counselee, title, tag }) => (
            <StoryListEntry
              key={_id}
              id={_id}
              img={counselee.imageURL}
              nickname={counselee.nickname}
              title={title}
              tag={tag}
            />
          ))}
        </StoryListContainer>
        <div className="indicator-wrapper">
          {hasPage.next && !isLoading && (
            <Icon
              icon="akar-icons:arrow-right"
              style={{ fontSize: "5rem" }}
              onClick={handleClickNextButton}
            ></Icon>
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  margin: 0 auto;
  min-height: 60rem;
  margin-bottom: 10vh;

  .indicator-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 10%;
  }
`;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;

  .result-text {
    font-size: ${({ theme }) => theme.fontSizes.lll};
  }
`;

const StoryListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  width: 100%;
  padding: 2em 0 0;
  row-gap: 5rem;
  font-family: "GangwonEdu_OTFBoldA";
`;

export default StoryList;
