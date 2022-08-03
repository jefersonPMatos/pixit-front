import { useContext, useState, useEffect } from "react";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../Contexts/AuthContext";
import api from "../../services/api";

import { Container, Greetings, Body, ActionButtons } from "./styles";

import Card from "../../components/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";

export default function Home() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);

  const textRegex = /^[A-zÀ-ú]+$/;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const [disabled, setDisable] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [errors, setErrors] = useState({
    firstName: {
      error: false,
      message: "",
    },
    lastName: {
      error: false,
      message: "",
    },
    email: {
      error: false,
      message: "",
    },
  });

  const checkFirstname = () => {
    if (editedUser.firstName.length === 0) {
      setErrors({
        ...errors,
        firstName: {
          error: true,
          message: "Campo obrigatório!",
        },
      });
    } else if (editedUser.firstName.length < 3) {
      setErrors({
        ...errors,
        firstName: {
          error: true,
          message: "Nome curto demais!",
        },
      });
    } else if (!editedUser.firstName.match(textRegex)) {
      setErrors({
        ...errors,
        firstName: {
          error: true,
          message: "Digite apenas letras!",
        },
      });
    } else {
      setErrors({
        ...errors,
        firstName: {
          error: false,
          message: "",
        },
      });
    }
  };

  const checkLastName = () => {
    if (editedUser.lastName.length === 0) {
      setErrors({
        ...errors,
        lastName: {
          error: true,
          message: "Campo obrigatório!",
        },
      });
    } else if (editedUser.lastName.length < 3) {
      setErrors({
        ...errors,
        lastName: {
          error: true,
          message: "Nome curto demais!",
        },
      });
    } else if (!editedUser.firstName.match(textRegex)) {
      setErrors({
        ...errors,
        lastName: {
          error: true,
          message: "Digite apenas letras!",
        },
      });
    } else {
      setErrors({
        ...errors,
        lastName: {
          error: false,
          message: "",
        },
      });
    }
  };

  const checkEmail = () => {
    if (!editedUser.email.match(emailRegex)) {
      setErrors({
        ...errors,
        email: {
          error: true,
          message: "Email inválido!",
        },
      });
    } else {
      setErrors({
        ...errors,
        email: {
          error: false,
          message: "",
        },
      });
    }
  };

  useEffect(() => {
    const err = Object.values(errors);
    const checkErrors = err.filter((elem) => elem.error === true);
    if (checkErrors.length > 0) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [errors]);

  const handleInputValue = (event) => {
    const value = event.target.value;
    setEditedUser({
      ...editedUser,
      [event.target.name]: value,
    });
  };

  const handleEditing = (event) => {
    event.preventDefault();
    setEditing(!editing);
  };

  const handleUpdateInfo = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    api
      .post(`user/${user.email}`, editedUser, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        setUser(res.data.user);
        Notify.success("Informações atualizadas");
      })
      .catch((err) => {
        Notify.failure("Algo inexperado aconteceu");
      });
  };

  const handleDeleteInfo = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    api
      .delete(`user/${user.email}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        Notify.success("Cadastro deletado");
        navigate("/");
      })
      .catch((err) => {
        Notify.failure("Algo inexperado aconteceu");
      });
  };

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    navigate("/");
    Notify.success("Nos vemos em breve!");
  };

  return (
    <Container>
      <Card fd="column" gap="15px">
        {editing ? (
          <>
            <Greetings>
              <p>Bem vindo,</p>
              <h2>{user.firstName}!</h2>
            </Greetings>

            <Body>
              <label>
                Primeiro nome:
                <Input
                  type="text"
                  defaultValue={user.firstName}
                  name="firstName"
                  onChange={handleInputValue}
                  onBlur={checkFirstname}
                />
              </label>
              <p>
                {errors.firstName.error === true && errors.firstName.message}
              </p>

              <label>
                Sobrenome:
                <Input
                  type="text"
                  defaultValue={user.lastName}
                  name="lastName"
                  onChange={handleInputValue}
                  onBlur={checkLastName}
                />
              </label>
              <p>{errors.lastName.error === true && errors.lastName.message}</p>

              <label>
                Email:
                <Input
                  type="text"
                  defaultValue={user.email}
                  name="email"
                  onChange={handleInputValue}
                  onBlur={checkEmail}
                />
              </label>
              <p>{errors.email.error && errors.email.message}</p>
            </Body>
            <ActionButtons>
              <Button type="button" onClick={handleEditing}>
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={disabled}
                onClick={handleUpdateInfo}
              >
                Atualizar dados
              </Button>
              <Button type="button" onClick={handleDeleteInfo}>
                Deletar conta
              </Button>
            </ActionButtons>
          </>
        ) : (
          <>
            <Greetings>
              <p>Bem vindo,</p>
              <h2>{user.firstName}!</h2>
            </Greetings>

            <Body>
              <span>
                <p>Nome completo: </p>
                <h3>
                  {user.firstName}
                  {user.lastName}
                </h3>
              </span>

              <span>
                <p>Email: </p>
                <h3>{user.email}</h3>
              </span>

              <span>
                <p>Data de nascimento: </p>
                <h3>{user.birthday}</h3>
              </span>

              <ActionButtons>
                <Button type="button" onClick={handleEditing}>
                  Editar
                </Button>
                <Button type="button" onClick={handleLogout}>
                  Logout
                </Button>
              </ActionButtons>
            </Body>
          </>
        )}
      </Card>
    </Container>
  );
}
