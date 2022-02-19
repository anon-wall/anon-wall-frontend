import { useState } from "react";
import styled from "styled-components";

import Modal from "../components/common/Modal";
import homeImage from "../assets/images/tree.jpg";
import Footer from "../components/Footer";
import { WELCOME_MESSAGE, BUTTON_NAME, DISCOVER_NOW } from "../constants/home";

function Home() {
  const [isModalOn, setIsModalOn] = useState(false);

  return (
    <>
      {isModalOn && (
        <Modal onClick={setIsModalOn} width="70rem" height="90rem" />
      )}
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
  background-color: ${({ theme }) => theme.colors.filler_bg};
  border-top: 3px solid black;
  border-bottom: 3px solid black;
`;

const Container = styled.section`
  display: flex;
  height: 100rem;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  border-right: 3px solid black;
  background-color: ${({ theme }) => theme.colors.home_bg};

  .message {
    margin: 1.4rem;
    text-align: center;
    font-size: 3.5rem;
    font-family: "GangwonEdu_OTFBoldA";
  }

  button {
    display: block;
    width: 17rem;
    height: 5rem;
    margin: auto;
    border-radius: 1rem;
    font-size: 2.2rem;
    font-family: "GangwonEdu_OTFBoldA";
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
