import { useState } from "react";
import styled from "styled-components";

import Modal from "../components/common/Modal";
import homeImage from "../assets/tree.png";
import Footer from "../components/Footer";
import { WELCOME_MESSAGE, BUTTON_NAME } from "../constants/home";

function Home() {
  const [isModalOn, setIsModalOn] = useState(false);

  return (
    <>
      <FillerBox />
      <Container>
        <DescriptionWrapper>
          <div>
            <div className="message">{WELCOME_MESSAGE}</div>
            <button onClick={setIsModalOn}>{BUTTON_NAME}</button>
            {isModalOn && (
              <Modal onClick={setIsModalOn} width="70rem" height="90rem">
                <ModalMessage>{DISCOVER_NOW}</ModalMessage>
              </Modal>
            )}
          </div>
        </DescriptionWrapper>
        <ImageWrapper>
          <img src={homeImage} alt="A tree and a window" />
        </ImageWrapper>
      </Container>
      <FillerBox />
      <Footer />
    </>
  );
}

const FillerBox = styled.div`
  width: 100%;
  height: 5rem;
  background-color: rgba(176, 182, 164, 1);
`;

const Container = styled.div`
  display: flex;
  height: 100rem;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.home_bg};

  .message {
    margin: 1.4rem;
    text-align: center;
    font-size: 2.5rem;
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

const ModalMessage = styled.div`
  margin: 3rem;
`;

const ImageWrapper = styled.div`
  width: 50%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;

export default Home;
