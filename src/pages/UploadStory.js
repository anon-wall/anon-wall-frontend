import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import axios from "axios";
import styled from "styled-components";

import SubHeader from "../components/common/SubHeader";
// import {
//   STORY_SUB_HEADER_HEADING,
//   STORY_SUB_HEADER_PARAGRAPH,
// } from "../constants/story";

export default function StoryNew() {
  const userId = useSelector(({ user }) => user.data._id);
  // const createdDate = new Date().toISOString();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState([]);
  // const [isModalOn, setIsModalOn] = useState(false);
  // const [isCreated, setIsCreated] = useState(true);
  // const [errorMessage, setErrorMessage] = useState(null);

  function handleChangeTitle(title) {
    setTitle(title);
  }

  function handleChangeContent(content) {
    setContent(content);
  }

  function handleChangeTag(tag) {
    setTag(tag);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, content, tag } = e.target.children;
    const splittedTags = tag.value.split("#");

    const newStory = {
      counselee: userId,
      title,
      content,
      splittedTags,
    };

    console.log(newStory);
  };

  // function inputCharacterCheck(object) {
  //   const restrictedRegex = "/[{}[]/?.,;:|)*~`!^-_+<>@#$%&\\=('\"]/g";
  //   const easy = restrictedRegex.split("");
  //   setNoRegex(object);

  //   if (easy.test(object.value)) {
  //     console.alert("특수문자 입력금지");
  //     object.value = object.value.substring(0, object.value.length - 1);
  //   }
  // }

  return (
    <>
      <SubHeader></SubHeader>
      <Link to="/counselors">
        <button>Back</button> {/** styled button */}
      </Link>
      <FormWrapper>
        <form action="" name="new-story-form" onSubmit={handleSubmit}>
          <input
            className="title"
            type="text"
            name="title"
            placeholder="제목을 입력해주세요."
            onChange={(e) => handleChangeTitle(e.target.value)}
            value={title}
          />
          <textarea
            name="content"
            placeholder="어떤 고민을 나누고 싶으신가요? 자유롭게 적어주세요! (2000자 이하)"
            onChange={(e) => handleChangeContent(e.target.value)}
            value={content}
          />
          <input
            className="tag"
            type="text"
            name="tag"
            placeholder="연관된 태그를 달아주세요. ex) #화해#부모님"
            onChange={(e) => handleChangeTag(e.target.value)}
            value={tag}
          />
          <input className="submit" type="submit" placeholder="사연 올리기" />
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
    width: 400px;
    height: 30px;
    margin: 10px;
    box-sizing: border-box;
    border: 4px solid #bfaea4;
    border-radius: 32px;
    text-align: center;
  }

  textarea {
    vertical-align: top;
    width: 400px;
    height: 200px;
    box-sizing: border-box;
    resize: none;
    padding-top: 5%;
    border: 4px solid #bfaea4;
    border-radius: 32px;
    text-align: center;
  }

  textarea:focus {
    outline: none !important;
    border-color: #719ece;
    box-shadow: 0 0 10px #719ece;
  }

  .tag {
    vertical-align: top;
    width: 400px;
    height: 30px;
    margin: 10px;
    box-sizing: border-box;
    border: 4px solid #bfaea4;
    border-radius: 32px;
    text-align: center;
  }

  .submit {
    width: 80px;
    height: 30px;
    align-items: flex-start;
    padding: 8px 29px;
    margin: 10px;
    box-sizing: border-box;
    border: 1px solid #b0adad;
    border-radius: 40px;
    background: #e8e8e8;
    box-shadow: 0px 0px 25px 3px rgba(0, 0, 0, 0.2);
  }
`;
