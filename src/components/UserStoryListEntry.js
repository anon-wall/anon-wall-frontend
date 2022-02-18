import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

function UserStoryListEntry({ id, title, status, counselors }) {
  const navigate = useNavigate();

  function handleClickStoryDetail() {
    navigate(`/counsels/${id}`);
  }

  return (
    <StoryWrapper onClick={handleClickStoryDetail}>
      <StoryContentWrapper>
        <div className="title">제목: {title}</div>
        <div className="counselors">수락 요청: {counselors}</div>
        <div className="status">{status}</div>
      </StoryContentWrapper>
    </StoryWrapper>
  );
}

const StoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  min-height: 13rem;
  padding: 0 4rem;
  margin: 0 auto;
  margin-bottom: 3rem;
  border: 0.3rem solid ${({ theme }) => theme.colors.card_border_1};
  border-radius: 4rem;
  font-size: ${({ theme }) => theme.fontSizes.mmmm};
`;

const StoryContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .status {
    align-self: flex-end;
  }
`;

UserStoryListEntry.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  counselors: PropTypes.any,
};

export default UserStoryListEntry;
