import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Greetings = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 4px;
  border: 1px solid rgba(0, 0, 255, 0.2);
  padding: 10px 15px;
`;

export const Body = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  gap: 10px;
  border: 1px solid #ff1a73;
  padding: 10px 40px;

  span {
    display: flex;
    align-items: baseline;
    gap: 10px;
  }
`;

export const Sform = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;
