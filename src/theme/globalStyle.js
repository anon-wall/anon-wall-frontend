import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @mixin flex($direction: "row", $align: "center", $justify: "center") {
    display: flex;
    flex-direction: $direction;
    align-items: $align;
    justify-content: $justify;
  }

  :root {
    font-size: 62.5%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  h1 {
    font-size: 3.5rem;
  }

  h2 {
    font-size: 3rem;
  }

  h3 {
    font-size: 2.5rem;
  }
`;

export default GlobalStyle;
