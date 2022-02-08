import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ImageWrapper from "./shared/ImageWrapper";
import StoryInfoWrapper from "./shared/StoryInfoWrapper";

export default function StoryListEntry({ id, img, nickname, title, tag }) {
  console.log(id, tag);
  return (
    <StoryWrapper>
      <ImageWrapper>
        <img src={img} alt="" />
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

StoryListEntry.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tag: PropTypes.array.isRequired,
};

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
