import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

import ImageWrapper from "./shared/ImageWrapper";
import StoryInfoWrapper from "./shared/StoryInfoWrapper";

function StoryListEntry({ id, img, nickname, title, tag }) {
  const navigate = useNavigate();

  function handleClickStoryDetail() {
    navigate(`/counsels/${id}`);
  }

  return (
    <StoryWrapper onClick={handleClickStoryDetail}>
      <ImageWrapper>
        <img src={img} alt="User's Profile" />
      </ImageWrapper>
      <StoryInfoWrapper>
        <div className="name">작성자: {nickname}</div>
        <div className="title">{title}</div>
        <div className="tags">
          {tag.map((tag) => {
            return <Tag key={tag}>#{tag}</Tag>;
          })}
        </div>
      </StoryInfoWrapper>
    </StoryWrapper>
  );
}

const Tag = styled.span`
  margin: 0 1rem;
`;

const StoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 6px solid #bfaea4;
  border-radius: 40px;
`;

StoryListEntry.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tag: PropTypes.array.isRequired,
};

export default StoryListEntry;
