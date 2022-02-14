import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import SubHeader from "../components/common/SubHeader";
import {
  STORY_SUB_HEADER_HEADING,
  STORY_SUB_HEADER_PARAGRAPH,
} from "../constants/story";
import {
  INPUT_TITLE,
  INPUT_CONTENT,
  INPUT_TAG,
  RESTRICT_REGEX,
} from "../constants/upload";

export default function StoryNew() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState([]);
  // const [isModalOn, setIsModalOn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const userId = useSelector(({ user }) => user.data._id);
  console.log(userId);

  function handleChangeTitle(title) {
    setTitle(title);
  }

  function handleChangeContent(content) {
    setContent(content);
  }

  function handleChangeTag(tag) {
    const reg = /[`~!@$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;

    if (tag.search(reg) > -1) {
      setErrorMessage(RESTRICT_REGEX);
    }

    setTag(tag.replace(reg, ""));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, content, tag } = e.target.children;
    const splittedTags = tag.value.split("#");

    const newStory = {
      counselee: userId,
      title: title.value,
      content: content.value,
      tag: splittedTags,
      createdAt: new Date().toISOString(),
    };

    await axios.post(
      `${process.env.REACT_APP_LOCAL_SERVER_URL}/api/counsels/new`,
      newStory,
      {
        withCredentials: true,
      }
    );
    console.log(newStory);
  };

  return (
    <>
      <SubHeader
        heading={STORY_SUB_HEADER_HEADING}
        paragraph={STORY_SUB_HEADER_PARAGRAPH}
      />
      <Link to="/counsels">
        <button>Back</button>
      </Link>
      <FormWrapper>
        <form name="new-story-form" onSubmit={handleSubmit}>
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
          {errorMessage && <div>{errorMessage}</div>}
          <button type="submit" className="submit">
            등록하기
          </button>
        </form>
      </FormWrapper>
    </>
  );
}

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;

  .title {
    vertical-align: top;
    width: 40rem;
    height: 3rem;
    margin: 1rem;
    box-sizing: border-box;
    border: 0.4rem solid #bfaea4;
    border-radius: 3.2rem;
    text-align: center;
  }

  textarea {
    vertical-align: top;
    width: 40rem;
    height: 20rem;
    box-sizing: border-box;
    resize: none;
    padding-top: 5%;
    border: 0.4rem solid #bfaea4;
    border-radius: 3.2rem;
    text-align: center;
  }

  textarea:focus {
    outline: none !important;
    border-color: #719ece;
    box-shadow: 0 0 1rem #719ece;
  }

  .tag {
    vertical-align: top;
    width: 40rem;
    height: 3rem;
    margin: 1rem;
    box-sizing: border-box;
    border: 0.4rem solid #bfaea4;
    border-radius: 3.2rem;
    text-align: center;
  }

  .submit {
    width: 20rem;
    height: 3rem;
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
