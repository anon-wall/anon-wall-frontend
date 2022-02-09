import { useState } from "react";
import { Icon } from "@iconify/react";
import styled from "styled-components";

import Modal from "../components/common/Modal";
import homeImage from "../assets/tree.png";
import { WELCOME_MESSAGE, BUTTON_NAME, COPYRIGHT } from "../constants/home";

function Home() {
  const [isModalOn, setIsModalOn] = useState(false);

  const handleModalOn = () => {
    setIsModalOn(true);
  };

  return (
    <>
      <UpperBoxWrapper />
      <MiddleContainer>
        <DescriptionContainer>
          <div className="description">
            <div className="message">{WELCOME_MESSAGE}</div>
            <button onClick={handleModalOn}>{BUTTON_NAME}</button>
            {isModalOn && (
              <Modal onClick={setIsModalOn} width="300px" height="600px" />
            )}
          </div>
        </DescriptionContainer>
        <ImageWrapper>
          <div className="image">
            <img src={homeImage} alt="A tree and a window" />
          </div>
        </ImageWrapper>
      </MiddleContainer>
      <LowerBoxWrapper />
      <FooterWrapper>
        <div className="copyright">{COPYRIGHT}</div>
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
  width: 100%;
  height: 50px;
  background-color: rgba(176, 182, 164, 1);
`;

const MiddleContainer = styled.div`
  display: flex;
  width: 90%;
  margin: 10px auto;
`;

const DescriptionContainer = styled.div`
  flex: 1;
  float: left;
  box-sizing: content-box;
  height: 400px;
  width: 50%;
  padding: 20px;
  background-color: rgba(191, 174, 164, 1);

  .description {
    margin-top: 50%;
  }

  .message {
    margin: 14px;
    text-align: center;
    font-size: 20px;
  }

  button {
    display: block;
    width: 170px;
    height: 50px;
    left: 270px;
    top: 500px;
    margin: auto;
    border-radius: 10px;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  float: right;
  box-sizing: content-box;

  img {
    width: 100%;
  }
`;

const LowerBoxWrapper = styled.div`
  width: 100%;
  height: 50px;
  background-color: rgba(176, 182, 164, 1);
`;

const FooterWrapper = styled.div`
  width: 100%;
  height: 70px;
  background-color: rgba(225, 219, 214, 1);

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

export default Home;
