import { useEffect, useState } from "react";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import { Container, Sform } from "./styles";

import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";

// import { checkFirstname } from "../../validations/register";

export default function Register() {
  const textRegex = /^[A-zÀ-ú]+$/;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const navigate = useNavigate();
  const [disabled, setDisable] = useState(false);
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
    birthday: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
    confirmPassword: {
      error: false,
      message: "",
    },
    terms: {
      error: false,
      message: "",
    },
  });

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
    terms: "",
  });

  const checkFirstname = () => {
    if (user.firstName.length === 0) {
      setErrors({
        ...errors,
        firstName: {
          error: true,
          message: "Campo obrigatório!",
        },
      });
    } else if (user.firstName.length < 3) {
      setErrors({
        ...errors,
        firstName: {
          error: true,
          message: "Nome curto demais!",
        },
      });
    } else if (!user.firstName.match(textRegex)) {
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
    if (user.lastName.length === 0) {
      setErrors({
        ...errors,
        lastName: {
          error: true,
          message: "Campo obrigatório!",
        },
      });
    } else if (user.lastName.length < 3) {
      setErrors({
        ...errors,
        lastName: {
          error: true,
          message: "Nome curto demais!",
        },
      });
    } else if (!user.firstName.match(textRegex)) {
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
    if (!user.email.match(emailRegex)) {
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

  const checkBirthday = () => {
    if (!user.birthday.length === 0) {
      setErrors({
        ...errors,
        birthday: {
          error: true,
          message: "Campo obrigatório!",
        },
      });
    } else {
      setErrors({
        ...errors,
        birthday: {
          error: false,
          message: "",
        },
      });
    }
  };

  const checkPassword = () => {
    if (user.password.length === 0) {
      setErrors({
        ...errors,
        password: {
          error: true,
          message: "Campo obrigatório!",
        },
      });
    } else if (user.password.length <= 5) {
      setErrors({
        ...errors,
        password: {
          error: true,
          message: "A senha precisa ter pelo menos 6 dígitos!",
        },
      });
    } else {
      setErrors({
        ...errors,
        password: {
          error: false,
          message: "",
        },
      });
    }
  };

  const checkConfirmPassword = () => {
    if (user.password !== user.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: {
          error: true,
          message: "As senhas precisam ser iguais",
        },
      });
    } else {
      setErrors({
        ...errors,
        confirmPassword: {
          error: false,
          message: "",
        },
      });
    }
  };

  const checkTerms = () => {
    if (user.terms !== false) {
      setErrors({
        ...errors,
        terms: {
          error: true,
          message: "Você precisa aceitar os termos e condições!",
        },
      });
    } else {
      setErrors({
        ...errors,
        terms: {
          error: false,
          message: "",
        },
      });
    }
  };

  //checa se tem erros de desabilita botão
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
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setUser({
      ...user,
      [event.target.name]: value,
    });
  };

  const handleSubmitFormData = async (event) => {
    event.preventDefault();
    console.log(user);

    await api
      .post("user/cadastrar", user)
      .then((res) => {
        Notify.success("Cadastrado efetuado com sucesso!");
        navigate("/");
      })
      .catch((err) => Notify.failure("Ops! Algo inexperado aconteceu!"));
  };

  return (
    <Container>
      <Card fd="column" gap="15px">
        <h2>Cadastre-se</h2>
        <Sform onSubmit={handleSubmitFormData}>
          <Input
            type="text"
            placeholder="Primeiro nome"
            name="firstName"
            onChange={handleInputValue}
            onBlur={checkFirstname}
          />
          <p>{errors.firstName.error === true && errors.firstName.message}</p>

          <Input
            type="text"
            placeholder="Sobrenome"
            name="lastName"
            onChange={handleInputValue}
            onBlur={checkLastName}
          />
          <p>{errors.lastName.error === true && errors.lastName.message}</p>

          <Input
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleInputValue}
            onBlur={checkEmail}
          />
          <p>{errors.email.error && errors.email.message}</p>

          <Input
            type="date"
            placeholder="Data de nascimento"
            name="birthday"
            onChange={handleInputValue}
            onBlur={checkBirthday}
          />
          <p>{errors.birthday.error && errors.birthday.message}</p>

          <Input
            type="password"
            placeholder="Crie uma senha"
            name="password"
            onChange={handleInputValue}
            onBlur={checkPassword}
          />
          <p>{errors.password.error && errors.password.message}</p>

          <Input
            type="password"
            placeholder="Confirme sua senha"
            name="confirmPassword"
            onChange={handleInputValue}
            onBlur={checkConfirmPassword}
          />
          <p>
            {errors.confirmPassword.error && errors.confirmPassword.message}
          </p>

          <Input
            checkbox
            type="checkbox"
            placeholder="terms"
            name="terms"
            onChange={handleInputValue}
            onClick={checkTerms}
          >
            Aceito os termos e condições
          </Input>
          <p>{errors.terms.error && errors.terms.message}</p>

          <Button disabled={disabled || errors.terms.error === true}>
            Cadastrar
          </Button>
        </Sform>
        <p>
          Já possui uma conta? <a href="/">Faça login!</a>
        </p>
      </Card>
    </Container>
  );
}
