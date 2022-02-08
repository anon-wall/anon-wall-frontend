import styled from "styled-components";

const LoadingSpinner = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 15px solid #f3f3f3;
  border-top: 16px solid #0e0f0f21;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

LoadingSpinner.defaultProps = {
  width: "120px",
  height: "120px",
};

export default LoadingSpinner;
