import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { getCounselList } from "../api/axios";
import UserStoryListEntry from "../components/UserStoryListEntry";
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
        const { data } = await getCounselList({
          options: {
            params: { page, limit: 6, counselee: userId, counselor: true },
            withCredentials: true,
          },
        });

        setStoryList(data.data.counsels);
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
        {storyList.map((story) => {
          const { _id, title, endDate, counselors } = story;
          const currentDate = new Date().toUTCString();
          const status = endDate || endDate < currentDate ? "종료" : "진행중";
          const numberOfRequest = counselors.length;

          return (
            <UserStoryListEntry
              key={_id}
              id={_id}
              title={title}
              status={status}
              counselors={numberOfRequest}
            />
          );
        })}
      </UserStoryListContainer>
    </>
  );
}

const UserStoryListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 3rem;
  padding: 2rem;
  width: 90%;
  font-size: 1.3rem;
`;

export default UserStoryList;
