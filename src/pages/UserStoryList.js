import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";

import MyPageWrapper from "../components/shared/MyPageWrapper";
import UserStoryLIstEntry from "../components/UserStoryLIstEntry";
import Modal from "../components/common/Modal";

function UserStoryList() {
  const [storyList, setStoryList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const userId = useSelector(({ user }) => user.data._id);
  console.log(userId);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels`,
          {
            withCredentials: true,
          }
        );

        // console.log(userId);

        setStoryList(data.data.pageCounsels);
      } catch (err) {
        setErrorMessage(err.response.data.message);
      }
    })();
  }, []);

  return (
    <>
      {errorMessage && (
        <Modal onClick={setErrorMessage} width="50rem" height="20rem">
          <p>{errorMessage}</p>
        </Modal>
      )}
      <MyPageWrapper>
        <UserStoryListContainer>
          {storyList.map((story) => {
            const { _id, title, endDate } = story;
            const currentDate = new Date().toUTCString();

            const isDone = endDate || endDate < currentDate ? "종료" : "진행중";

            return (
              <UserStoryLIstEntry
                key={_id}
                id={_id}
                title={title}
                endDate={isDone}
              />
            );
          })}
        </UserStoryListContainer>
      </MyPageWrapper>
    </>
  );
}

const UserStoryListContainer = styled.div`
  /* display: grid; */
  justify-content: center;
  padding: 2em 0 0;
  column-gap: 2vw;
  row-gap: 2rem;
  width: 100%;
`;

export default UserStoryList;
