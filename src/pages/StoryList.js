import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { getCounselList } from "../api/axios";
import StyledLoadingSpinner from "../components/shared/StyledLoadingSpinner";
import SubHeader from "../components/common/SubHeader";
import Modal from "../components/common/Modal";
import StyledTransparentButton from "../components/shared/StyledTransparentButton";
import StoryListEntry from "../components/StoryListEntry";
import SearchBar from "../components/SearchBar";
import {
  STORY_SUB_HEADER_HEADING,
  STORY_SUB_HEADER_PARAGRAPH,
  PREV,
  NEXT,
} from "../constants/story";

function StoryList() {
  const [storyList, setStoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
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
          params: { page: 1, limit: 6, tag: keyword },
          withCredentials: true,
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
  }

  function handleClickNextButton() {
    setPage((page) => page + 1);
  }

  function handleSearchKeyword(keyword) {
    setPage(1);
    setKeyword(keyword);
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
      {isLoading && <StyledLoadingSpinner />}
      <StoryListContainer>
        {storyList?.map((story) => {
          const { _id, counselee, title, tag } = story;

          return (
            <StoryListEntry
              key={_id}
              id={_id}
              img={counselee.imageURL}
              nickname={counselee.nickname}
              title={title}
              tag={tag}
            />
          );
        })}
      </StoryListContainer>
      {hasPage.prev && (
        <StyledTransparentButton onClick={handleClickPrevButton}>
          {PREV}
        </StyledTransparentButton>
      )}
      {hasPage.next && (
        <StyledTransparentButton onClick={handleClickNextButton}>
          {NEXT}
        </StyledTransparentButton>
      )}
    </>
  );
}

const StoryListContainer = styled.div`
  display: grid;
  justify-content: center;
  padding: 2em 0 0;
  grid-template-columns: repeat(3, 47rem);
  grid-template-rows: repeat(2, 36rem);
  column-gap: 2vw;
  row-gap: 5rem;
  width: 100%;
`;

export default StoryList;
