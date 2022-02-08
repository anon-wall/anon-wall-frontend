import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import SubHeader from "../components/common/SubHeader";
// import Modal from "../components/common/Modal";
import { prevButton, nextButton } from "../features/paginationSlice";
import StyledTransparentButton from "../components/shared/StyledTransparentButton";
import {
  STORY_SUB_HEADER_HEADING,
  STORY_SUB_HEADER_PARAGRAPH,
  PREV,
  NEXT,
} from "../constants/story";
import StoryListEntry from "../components/StoryListEntry";
import SearchBar from "../components/SearchBar";

export default function StoryList() {
  const { error, page, size, pageCounsels, hasPrevPage, hasNextPage } =
    useSelector(({ pagination }) => pagination);
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState(false);

  console.log(errorMessage);

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  useEffect(() => {
    handleClickNextButton();
  }, []);

  function handleClickPrevButton() {
    dispatch(prevButton({ page: page - 1, size }));
  }

  function handleClickNextButton() {
    dispatch(nextButton({ page: page + 1, size }));
  }

  return (
    <>
      <SubHeader
        heading={STORY_SUB_HEADER_HEADING}
        paragraph={STORY_SUB_HEADER_PARAGRAPH}
      />
      <SearchBar />
      <StoryListContainer>
        {pageCounsels.map((story) => {
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
      {hasPrevPage && (
        <StyledTransparentButton onClick={handleClickPrevButton}>
          {PREV}
        </StyledTransparentButton>
      )}
      {hasNextPage && (
        <StyledTransparentButton onClick={handleClickNextButton}>
          {NEXT}
        </StyledTransparentButton>
      )}
      <Outlet />
    </>
  );
}

const StoryListContainer = styled.div`
  display: grid;
  justify-content: center;
  padding: 2em 0 0;
  grid-template-columns: repeat(3, 47rem);
  grid-template-rows: repeat(2, 36rem);
  column-gap: 1vw;
  row-gap: 2vh;
  width: 100%;
`;
