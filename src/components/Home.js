import { useState } from "react";
import { Icon } from "@iconify/react";
import styled from "styled-components";

import Modal from "./common/Modal";
import photo from "../assets/tree.png";

export default function Home() {
  const welcomeMessage =
    "주변에 말 못할 고민이 있으신가요? 익명의 사람들과 고민을 나눠보세요!";
  const buttonName = "Discover Now";
  const copyright = "All rights reserved to anon-wall";

  const [modalOn, setModalOn] = useState(false);

  const handleModalOn = () => {
    setModalOn(true);
  };

  return (
    <>
      <UpperBoxWrapper />
      <MiddleContainer>
        <DescriptionContainer>
          <div className="description">
            <div className="message">{welcomeMessage}</div>
            <button onClick={handleModalOn}>{buttonName}</button>
            {modalOn && (
              <Modal onClick={handleModalOn} width="300px" height="600px" />
            )}
          </div>
        </DescriptionContainer>
        <ImageWrapper>
          <div className="image">
            <img src={photo} atl="" />
          </div>
        </ImageWrapper>
      </MiddleContainer>
      <LowerBoxWrapper />
      <FooterWrapper>
        <div className="copyright">{copyright}</div>
        <div className="icon">
          <Icon
            className="health-icon"
            icon="healthicons:agriculture-outline"
          />
        </div>
      </FooterWrapper>
    </>
  );
}

const UpperBoxWrapper = styled.div`
  background-color: rgba(176, 182, 164, 1);
  width: 100%;
  height: 50px;
`;

const MiddleContainer = styled.div`
  width: 90%;
  margin: 10px auto;
  display: flex;
`;

const DescriptionContainer = styled.div`
  background-color: rgba(191, 174, 164, 1);
  float: left;
  flex: 1;
  padding: 20px;
  height: 400px;
  width: 50%;
  box-sizing: content-box;

  .description {
    margin-top: 50%;
  }

  .message {
    font-size: 20px;
    text-align: center;
    margin: 14px;
  }

  button {
    width: 170px;
    height: 50px;
    left: 270px;
    top: 500px;
    border-radius: 10px;
    margin: auto;
    display: block;
  }
`;

const ImageWrapper = styled.div`
  float: right;
  flex: 1;
  box-sizing: content-box;

  img {
    width: 100%;
  }
`;

const LowerBoxWrapper = styled.div`
  background-color: rgba(176, 182, 164, 1);
  width: 100%;
  height: 50px;
`;

const FooterWrapper = styled.div`
  background-color: rgba(225, 219, 214, 1);
  width: 100%;
  height: 70px;

  .copyright {
    text-align: center;
    font-size: 20px;
  }

  .icon {
    float: right;
    margin: 10px;
  }

  .health-icon {
    width: 80px;
    height: 80px;
  }
`;
