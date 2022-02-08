import styled from "styled-components";

import notFoundImage from "../assets/404.png";

export default function NotFound() {
  return (
    <Container>
      <ImageWrapper>
        <img src={notFoundImage} alt="404" />
      </ImageWrapper>
      <Text>
        Oooops!The page you were looking for does not exist. Don’t worry, it’s
        just a 404 page.Go home.
      </Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageWrapper = styled.div`
  width: 50%;
  img {
    width: 100%;
    height: 700px;
  }
`;

const Text = styled.p`
  width: 50%;
  font-size: 2.5rem;
  text-align: center;
`;
