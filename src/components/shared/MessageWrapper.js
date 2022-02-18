import styled from "styled-components";

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin: 50px;
    padding: 5px;
    width: 80px;
    background-color: #95bcf0;
    border-radius: 3rem;
    border: none;
    color: white;
    font-size: 1.6rem;
    font-weight: bold;
    cursor: pointer;
  }
`;

export default MessageWrapper;
