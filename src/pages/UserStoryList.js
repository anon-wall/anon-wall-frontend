import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";

import UserStoryLIstEntry from "../components/UserStoryLIstEntry";
import Modal from "../components/common/Modal";
import StyledTransparentButton from "../components/shared/StyledTransparentButton";
import { PREV, NEXT } from "../constants/story";

function UserStoryList() {
  const [storyList, setStoryList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [page, setPage] = useState(1);
  const [hasPage, setHasPage] = useState({
    prev: false,
    next: false,
  });
  const userId = useSelector(({ user }) => user.data._id);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels`,
          {
            params: { page, size: 6, counselee: userId },
            withCredentials: true,
          }
        );

        setStoryList(data.data.pageCounsels);
        setHasPage({
          ...hasPage,
          prev: data.data.hasPrevPage,
          next: data.data.hasNextPage,
        });
      } catch (err) {
        setErrorMessage(err.response.data.message);
      }
    })();
  }, [page]);

  function handleClickPrevButton() {
    setPage((page) => page - 1);
  }

  function handleClickNextButton() {
    setPage((page) => page + 1);
  }

  return (
    <>
      {errorMessage && (
        <Modal onClick={setErrorMessage} width="50rem" height="20rem">
          <p>{errorMessage}</p>
        </Modal>
      )}
      <UserStoryListContainer>
        {storyList.map((story) => {
          const { _id, title, endDate, counselors } = story;
          const currentDate = new Date().toUTCString();
          const isDone = endDate || endDate < currentDate ? "종료" : "진행중";
          const numberOfRequest = counselors.length;

          return (
            <UserStoryLIstEntry
              key={_id}
              id={_id}
              title={title}
              endDate={isDone}
              counselors={numberOfRequest}
            />
          );
        })}
      </UserStoryListContainer>
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

const UserStoryListContainer = styled.div`
  justify-content: center;
  padding: 2rem 0 0;
  column-gap: 2vw;
  row-gap: 2rem;
  width: 100%;
  font-size: 1.5rem;
`;

export default UserStoryList;