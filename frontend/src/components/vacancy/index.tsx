import React from "react";
import cn from "classnames";
import Box from "../box";

import style from "./index.module.scss";
import Button from "./../button/index";

type vacancy = {
  header: string;
  description: string;
  disableButton: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  hideButton?: boolean;
  className?: string;
};

const Vacancy: React.FC<vacancy> = (props) => {
  const { header, description, disableButton, onClick, hideButton, className } =
    props;

  return (
    <Box
      className={cn(style.root, className)}
      header={header}
      body={
        <>
          <div>{description}</div>
          <div>
            {!hideButton && (
              <Button
                onClick={onClick}
                text={"Откликнуться"}
                disableFill={disableButton}
              />
            )}
          </div>
        </>
      }
    />
  );
};

export default Vacancy;
