import { Container, Sinput } from "./styles";

export default function Input({ children, ...rest }) {
  return (
    <Container>
      {children}
      <Sinput {...rest} />
    </Container>
  );
}
