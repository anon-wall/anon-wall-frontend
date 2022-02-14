import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

import StoryInfoWrapper from "./shared/StoryInfoWrapper";

function StoryListEntry({ id, title, endDate, counselors }) {
  const navigate = useNavigate();

  function handleClickStoryDetail() {
    navigate(`/counsels/${id}`);
  }

  return (
    <StoryWrapper onClick={handleClickStoryDetail}>
      <StoryInfoWrapper>
        <div className="title">제목: {title}</div>
        <div>{endDate}</div>
        <div>수락 요청: {counselors}</div>
      </StoryInfoWrapper>
    </StoryWrapper>
  );
}

const StoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 6px solid #bfaea4;
  border-radius: 40px;
`;

StoryListEntry.propTypes = {
  id: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  counselors: PropTypes.any,
};

export default StoryListEntry;
