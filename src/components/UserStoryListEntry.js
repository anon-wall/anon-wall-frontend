import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

function UserStoryListEntry({ id, title, endDate, counselors }) {
  const navigate = useNavigate();

  function handleClickStoryDetail() {
    navigate(`/counsels/${id}`);
  }

  return (
    <StoryWrapper onClick={handleClickStoryDetail}>
      <MyStoryInfoWrapper>
        <div className="title">제목: {title}</div>
        <div className="endDate">{endDate}</div>
        <div className="counselors">수락 요청: {counselors}</div>
      </MyStoryInfoWrapper>
    </StoryWrapper>
  );
}

const StoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0.5rem;
  padding: 0 4rem;
  height: 9rem;
  border: 0.2rem solid #bfaea4;
  border-radius: 4rem;
`;

const MyStoryInfoWrapper = styled.div`
  width: 100%;
`;

UserStoryListEntry.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  counselors: PropTypes.any,
};

export default UserStoryListEntry;