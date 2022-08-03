import { createGlobalStyle } from "styled-components";

const Theme = createGlobalStyle`
 html, body {
  font-family: 'Roboto', sans-serif;
  height: 100vh;
  background-color: #EAF6F6;
  }

  h1 {
    font-weight: bold;
    font-size: 40px;
    text-transform: uppercase;
  }

  h2 {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 20px;
  }

  h3 {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 16px;
  }

  p {
    font-size: 14px;
    color: #000;
  }

  a {
    font-size: 16px;
    color: #ff1a73;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export { Theme };
