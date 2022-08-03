import styled from "styled-components";

export const Container = styled.button`
  outline: none;
  border: none;
  padding: 5px 15px;
  font-family: "Bebas Neue";
  letter-spacing: 2px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #ff1a73;

  &:disabled {
    opacity: 0.2;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 4px 4px 2px 1px rgba(0, 0, 255, 0.2);
  }
`;
