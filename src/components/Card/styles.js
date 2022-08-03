import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  height: 500px;
  width: 400px;
  /* border: 1px solid rgba(255, 255, 255, 0.5); */
  flex-direction: ${(props) => props.fd};
  gap: ${(props) => props.gap};

  box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, 0.2);
`;
