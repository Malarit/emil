import React from "react";
import cn from "classnames";

import style from "./index.module.scss";
import Button from "../button";

type auth = {
  list: {
    placeholder: string;
    type: React.HTMLInputTypeAttribute | undefined;
    name: string;
    active: boolean;
    key?: string;
    value: string;
  }[];
  header: string;
  buttonTextAuth: string;
  buttonTextRe: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickAuth: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClickRe: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  invalidText?: string;
  invalid?: boolean;
};

const Auth: React.FC<auth> = (props) => {
  const {
    list,
    header,
    buttonTextAuth,
    onClickAuth,
    onClickRe,
    buttonTextRe,
    onChange,
    invalid,
    invalidText
  } = props;

  return (
    <div className={style.root}>
      <h3>{header}</h3>
      {list.map((item) => (
        <input
          key={item.key ?? item.name}
          className={cn({ [style.active]: item.active })}
          {...item}
          onChange={onChange}
        />
      ))}
      <Button
        onClick={onClickAuth}
        className={style.button}
        text={buttonTextAuth}
      />
      <Button
        onClick={onClickRe}
        className={style.button}
        text={buttonTextRe}
        disableFill
      />
      {invalid && <span>{invalidText}</span>}
    </div>
  );
};

export default Auth;
