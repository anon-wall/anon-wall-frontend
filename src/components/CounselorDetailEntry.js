import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

function CounselorDetailEntry({ id, imageURL, nickname, shortInput, tag }) {
  const { counsel_id } = useParams();
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/counsels/${counsel_id}/counselors/${id}`);
  }

  return (
    <CounselorContainer onClick={handleClick}>
      <CounselorImageWrapper>
        <img src={imageURL} alt="Profile Image" />
      </CounselorImageWrapper>
      <CounselorInfoWrapper>
        <div className="name">{nickname}</div>
        <div>{shortInput}</div>
        <div>
          {tag.map((tag) => {
            return <Tag key={tag}>#{tag}</Tag>;
          })}
        </div>
      </CounselorInfoWrapper>
    </CounselorContainer>
  );
}

const CounselorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  margin: 1rem;
  border: 3px solid #bfaea4;
  border-radius: 40px;
  cursor: pointer;
`;

const CounselorImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25rem;
  max-height: 25rem;
  background-color: transparent;

  img {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    background-color: #ffffff;
  }
`;

const CounselorInfoWrapper = styled.div`
  width: 100%;
  line-height: 4rem;
  font-size: 1.7rem;
  text-align: center;

  .name {
    font-size: 2rem;
    color: #3e005b;
  }
`;

const Tag = styled.span`
  margin: 0 1rem;
`;

CounselorDetailEntry.propTypes = {
  id: PropTypes.string,
  imageURL: PropTypes.string,
  nickname: PropTypes.string,
  shortInput: PropTypes.string,
  tag: PropTypes.arrayOf(PropTypes.string),
};

export default CounselorDetailEntry;
