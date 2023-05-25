import React from "react";
import Auth from "../../components/auth";

import { useMutation } from "react-query";
import { authPost, regPost } from "../../services/req";
import { useAppDispatch } from "./../../redux/hooks";
import { fetchItsMe } from "./../../redux/slices/account/slice";

const AuthContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const [re, setRe] = React.useState(true);
  const [invalid, setInvalid] = React.useState(false);
  const [authInput, setAuthInput] = React.useState({
    email: "",
    password: "",
  });
  const [regInput, setRegInput] = React.useState({
    email: "",
    password: "",
    firstName: "",
    secondName: "",
    secondPassword: "",
  });

  const postAuth = useMutation(
    (data: { email: string; password: string }) => authPost(data),
    {
      onSuccess: () => {
        dispatch(fetchItsMe());
      },
      onError: () => {
        setInvalid(true);
      },
    }
  );
  const postReg = useMutation(
    (data: {
      email: string;
      password: string;
      firstName: string;
      secondName: string;
    }) => regPost(data),
    {
      onSuccess: () => {
        dispatch(fetchItsMe());
      },
    }
  );

  const auth = [
    { placeholder: "Почта", type: "text", name: "email" },
    { placeholder: "Пароль", type: "password", name: "password" },
  ].map((item) => ({
    ...item,
    active: Boolean(authInput[item.name as keyof typeof authInput]),
    value: authInput[item.name as keyof typeof authInput],
  }));

  const reg = [
    { placeholder: "Почта", type: "text", name: "email", key: "asd" },
    { placeholder: "Имя", type: "text", name: "firstName" },
    { placeholder: "Фамилия", type: "text", name: "secondName" },
    { placeholder: "Пароль", type: "password", name: "password", key: "zxc" },
  ].map((item) => ({
    ...item,
    active: Boolean(regInput[item.name as keyof typeof regInput]),
    value: regInput[item.name as keyof typeof regInput],
  }));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInvalid(false);

    if (re) {
      setAuthInput((current) => ({ ...current, [name]: value }));
      return;
    }

    setRegInput((current) => ({ ...current, [name]: value }));
  };

  const onClickAuth = () => {
    if (re) {
      postAuth.mutate(authInput);
      return;
    }

    postReg.mutate(regInput);
  };

  return (
    <Auth
      list={re ? auth : reg}
      header={re ? "Авторизация" : "Регистрация"}
      buttonTextAuth={re ? "Авторизоваться" : "Зарегистрироваться"}
      buttonTextRe={re ? "Нет аккаунта?" : "Есть аккаунт?"}
      onClickAuth={onClickAuth}
      onClickRe={() => {
        setRe(!re);
        setInvalid(false);
      }}
      onChange={onChange}
      invalidText={re ? "Неверный логин или пароль" : "Пароли не совподают"}
      invalid={invalid}
    />
  );
};

export default AuthContainer;
