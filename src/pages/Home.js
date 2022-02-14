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
          <div>
            <div className="message">{WELCOME_MESSAGE}</div>
            <button onClick={handleModalOn}>{BUTTON_NAME}</button>
            {isModalOn && (
              <Modal onClick={setIsModalOn} width="70rem" height="90rem" />
            )}
          </div>
        </DescriptionContainer>
        <ImageWrapper>
          <div>
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
  height: 5rem;
  background-color: rgba(176, 182, 164, 1);
`;

const MiddleContainer = styled.div`
  display: flex;
  width: 100%;
  margin: auto;
`;

const DescriptionContainer = styled.div`
  flex: 1;
  float: left;
  box-sizing: content-box;
  padding: 2rem;
  background-color: rgba(191, 174, 164, 1);

  div {
    margin-top: 50rem;
  }

  .message {
    margin: 1.4rem;
    text-align: center;
    font-size: 4rem;
  }

  button {
    display: block;
    width: 17rem;
    height: 5rem;
    margin: auto;
    border-radius: 1rem;
    font-size: 2rem;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  float: right;
  box-sizing: content-box;
  width: auto;

  img {
    width: 100%;
    height: auto;
  }
`;

const LowerBoxWrapper = styled.div`
  width: 100%;
  height: 5rem;
  background-color: rgba(176, 182, 164, 1);
`;

const FooterWrapper = styled.div`
  width: 100%;
  height: 10rem;
  background-color: rgba(225, 219, 214, 1);

  .copyright {
    text-align: center;
    font-size: 3rem;
  }

  .icon {
    float: right;
    margin: 1rem;
  }

  .health-icon {
    width: 8rem;
    height: 8rem;
  }
`;

export default Home;
