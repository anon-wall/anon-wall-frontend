import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";

import { RESTRICT_REGEX } from "../constants/upload";
import StyledTransparentButton from "../components/shared/StyledTransparentButton";
import Modal from "../components/common/Modal";

function SearchBar({ onSubmitKeyword }) {
  const navigate = useNavigate();

  const [tag, setTag] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const isLoggedIn = useSelector(({ user }) => user.isLoggedIn);

  function handleChangeTag(tag) {
    const reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;

    if (tag.search(reg) > -1) {
      setErrorMessage(RESTRICT_REGEX);
    }

    setTag(tag.replace(reg, ""));
  }

  async function handleSubmitTag(e) {
    e.preventDefault();
    onSubmitKeyword(tag);
  }

  function handleClickButtonUpload() {
    if (!isLoggedIn) {
      setModalMessage("로그인이 필요합니다.");
      return;
    }
    navigate("/counsels/new");
  }

  return (
    <SearchBarContainer>
      {modalMessage && (
        <Modal onClick={setModalMessage} width="50rem" height="20rem">
          {modalMessage}
        </Modal>
      )}
      <div className="button-container">
        <StyledTransparentButton onClick={handleClickButtonUpload}>
          고민 올리기
        </StyledTransparentButton>
      </div>
      <form className="search-container" onSubmit={handleSubmitTag}>
        <input
          type="text"
          placeholder="태그 검색"
          onChange={(e) => handleChangeTag(e.target.value)}
          value={tag}
        />
        <Icon className="icon" icon="ph:magnifying-glass-light" />
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    </SearchBarContainer>
  );
}

const SearchBarContainer = styled.div`
  .button-container {
    height: 2rem;
  }

  .button-container button {
    float: right;
    height: 4rem;
    margin: 1rem 2rem;
  }

  .search-container {
    width: 40rem;
    display: block;
    margin: 0 auto;
  }

  .search-container input {
    margin: 2.5rem auto 1rem;
    width: 100%;
    height: 5.5rem;
    padding: 0 20px;
    border: 3.5px solid #bfaea4;
    border-radius: 30px;
    outline: none;
    font-size: 1.6rem;
    color: #bfaea4;
  }

  .search-container input:focus {
    border: 3.5px solid red;
    transition: 0.35s ease;
    color: red;
    &::-webkit-input-placeholder {
      transition: opacity 0.45s ease;
      opacity: 0;
    }
    &::-moz-placeholder {
      transition: opacity 0.45s ease;
      opacity: 0;
    }
    &:-ms-placeholder {
      transition: opacity 0.45s ease;
      opacity: 0;
    }
  }

  .search-container .icon {
    position: relative;
    float: right;
    width: 3rem;
    height: 3rem;
    top: -5.5rem;
    right: 1.5rem;
  }
`;

SearchBar.propTypes = {
  onSubmitKeyword: PropTypes.func.isRequired,
};

export default SearchBar;
