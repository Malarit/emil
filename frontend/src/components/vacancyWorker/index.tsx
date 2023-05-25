import React from "react";
import Box from "../box";

import style from "./index.module.scss";
import Button from "./../button/index";

type vacancy = {
  header: string;
  description: string;
  disableButton: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Vacancy: React.FC<vacancy> = (props) => {
  const { header, description, disableButton, onClick } = props;

  return (
    <Box
      className={style.root}
      header={header}
      body={
        <>
          <div>{description}</div>
          <div>
            <Button
              onClick={onClick}
              text={"Принять"}
              disableFill={disableButton}
            />
            
          </div>
        </>
      }
    />
  );
};

export default Vacancy;
