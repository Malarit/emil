import React from "react";
import Box from "../box";
import Button from "../button";

import style from "./index.module.scss";

type profile = {
  name: string;
  textArea: string;
  inputValue: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTextArea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClickSave: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onCLickLeave: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Profile: React.FC<profile> = (props) => {
  const {
    name,
    onClickSave,
    onCLickLeave,
    textArea,
    inputValue,
    onChangeInput,
    onChangeTextArea
  } = props;

  return (
    <Box
      header={name}
      body={
        <>
          <input
            type="text"
            placeholder="Город"
            name="city"
            value={inputValue}
            onChange={onChangeInput}
          />
          <br />
          Расскажите о себе
          <textarea value={textArea} onChange={onChangeTextArea} ></textarea>
          <div>
            <Button text={"Сохранить"} onClick={onClickSave} />
            <Button text={"Выйти"} onClick={onCLickLeave} disableFill />
          </div>
        </>
      }
      className={style.root}
    />
  );
};

export default Profile;
