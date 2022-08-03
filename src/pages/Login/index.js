import { useContext, useState } from "react";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../Contexts/AuthContext";

import api from "../../services/api";

import { Container, Sform } from "./styles";

import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";

import Spinner from "../../images/spinner.svg";

export default function Login() {
  const { setAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const handleInputValue = (event) => {
    const value = event.target.value;
    setUserLogin({
      ...userLogin,
      [event.target.name]: value,
    });
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();

    setLoading(true);

    await api
      .post("user/login", userLogin)
      .then((res) => {
        console.log(res.data.user);
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
        setAuthenticated(true);
        Notify.success("Bem vindo!");
        setLoading(false);
        navigate("/home");
      })
      .catch((err) => {
        setLoading(false);
        Notify.failure("Usuário ou senha incorreto");
      });
  };

  return (
    <Container>
      <Card fd="column" gap="15px">
        <h2>Pixit</h2>
        <Sform onSubmit={handleSubmitLogin}>
          <Input
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleInputValue}
          />

          <Input
            type="password"
            placeholder="Senha"
            name="password"
            onChange={handleInputValue}
          />

          {loading ? (
            <img src={Spinner} width={50} alt="" />
          ) : (
            <Button>Login</Button>
          )}
        </Sform>
        <p>
          Ainda não possui uma conta? <a href="/register">Cadastre-se!</a>
        </p>
      </Card>
    </Container>
  );
}
