import styled, { css } from "styled-components";

export const Container = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;

export const Sinput = styled.input`
  ${(props) => {
    if (props.checkbox) {
      return css`
        width: 20px;
        height: 20px;
        cursor: pointer;
      `;
    } else {
      return css`
        font-size: 14px;
        background-color: transparent;
        height: 10px;
        width: 200px;
        padding-inline: 0.5em;
        padding-block: 0.7em;
        border: 1px solid #000;
        caret-color: #ff1a73;
        outline: none;

        &:hover {
          ::placeholder {
            opacity: 0.5;
          }
        }

        &:focus {
          border: 1px solid #ff1a73;
        }
      `;
    }
  }}
`;
