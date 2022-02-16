import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import SubHeader from "../components/common/SubHeader";
import Modal from "../components/common/Modal";
import {
  STORY_SUB_HEADER_HEADING,
  STORY_SUB_HEADER_PARAGRAPH,
} from "../constants/story";
import {
  INPUT_TITLE,
  INPUT_CONTENT,
  INPUT_TAG,
  RESTRICT_REGEX,
  UPLOAD_SUCCESS,
} from "../constants/upload";

function UploadStory() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const userId = useSelector(({ user }) => user.data._id);

  function handleChangeTitle(title) {
    setTitle(title);
  }

  function handleChangeContent(content) {
    setContent(content);
  }

  function handleChangeTag(tag) {
    const reg = /[`~!@#$%^&*()_|+\-=?;:'".<>\{\}\[\]\\\/ ]/gim;

    if (tag.search(reg) > -1) {
      setErrorMessage(RESTRICT_REGEX);
    }

    setTag(tag.replace(reg, ""));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, content, tag } = e.target.children;
    const splittedTags = tag.value.split(",");
    const newStory = {
      counselee: userId,
      title: title.value,
      content: content.value,
      tag: splittedTags,
      createdAt: new Date().toUTCString(),
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels`,
        newStory,
        {
          withCredentials: true,
        }
      );

      setModalMessage(UPLOAD_SUCCESS);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <>
      {errorMessage && (
        <Modal onClick={setErrorMessage} width="50rem" height="20rem">
          {errorMessage}
        </Modal>
      )}
      {modalMessage && (
        <Modal onClick={setModalMessage} width="50rem" height="20rem">
          {modalMessage}
        </Modal>
      )}
      <SubHeader
        heading={STORY_SUB_HEADER_HEADING}
        paragraph={STORY_SUB_HEADER_PARAGRAPH}
      />
      <Link to="/counsels">
        <button>Back</button>
      </Link>
      <FormWrapper>
        <form className="new-story-form" onSubmit={handleSubmit}>
          <input
            className="title"
            type="text"
            name="title"
            placeholder={INPUT_TITLE}
            onChange={(e) => handleChangeTitle(e.target.value)}
            value={title}
          />
          <textarea
            name="content"
            placeholder={INPUT_CONTENT}
            onChange={(e) => handleChangeContent(e.target.value)}
            value={content}
          />
          <input
            className="tag"
            type="text"
            name="tag"
            placeholder={INPUT_TAG}
            onChange={(e) => handleChangeTag(e.target.value)}
            value={tag}
          />
          <button type="submit" className="submit">
            등록하기
          </button>
        </form>
      </FormWrapper>
    </>
  );
}

const FormWrapper = styled.div`
  .new-story-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .title {
    vertical-align: top;
    width: 70rem;
    height: 5rem;
    margin: 1rem;
    box-sizing: border-box;
    border: 0.2rem solid #bfaea4;
    border-radius: 1.5rem;
    text-align: center;
  }

  textarea {
    vertical-align: top;
    width: 70rem;
    height: 37rem;
    box-sizing: border-box;
    resize: none;
    margin: 10px 0;
    padding-top: 5%;
    border: 0.2rem solid #bfaea4;
    border-radius: 1.5rem;
    text-align: center;
  }

  textarea:focus {
    outline: none !important;
    border-color: #719ece;
    box-shadow: 0 0 1rem #719ece;
  }

  .tag {
    vertical-align: top;
    width: 70rem;
    height: 5rem;
    margin: 1rem;
    box-sizing: border-box;
    border: 0.2rem solid #bfaea4;
    border-radius: 1.5rem;
    text-align: center;
  }

  .submit {
    width: 15rem;
    height: 4rem;
    align-items: flex-start;
    padding: 0.8rem 2.9rem;
    margin: 1rem;
    box-sizing: border-box;
    border: 0.1rem solid #b0adad;
    border-radius: 4rem;
    background: #e8e8e8;
    box-shadow: 0rem 0rem 2.5rem 0.3rem rgba(0, 0, 0, 0.2);
  }
`;

export default UploadStory;
