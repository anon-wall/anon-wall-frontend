import styled from "styled-components";

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 25rem;
  min-height: 25rem;
  background-color: transparent;

  img {
    object-fit: cover;
    min-width: 20rem;
    min-height: 20rem;
    border-radius: 50%;
    background-color: transparent;
  }
`;

export default ImageWrapper;
