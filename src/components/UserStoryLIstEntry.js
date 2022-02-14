import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

function StoryListEntry({ id, title, endDate, counselors }) {
  const navigate = useNavigate();

  function handleClickStoryDetail() {
    navigate(`/counsels/${id}`);
  }

  return (
    <StoryWrapper onClick={handleClickStoryDetail}>
      <MyStoryInfoWrapper>
        <div className="title">제목: {title}</div>
        <div>{endDate}</div>
        <div>수락 요청: {counselors}</div>
      </MyStoryInfoWrapper>
    </StoryWrapper>
  );
}

const MyStoryInfoWrapper = styled.div`
  width: 100%;
`;

const StoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 0.2rem solid #bfaea4;
  border-radius: 4rem;
`;

StoryListEntry.propTypes = {
  id: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  counselors: PropTypes.any,
};

export default StoryListEntry;
