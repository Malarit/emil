import React from "react";
import cn from "classnames";
import Box from "../box";

import style from "./index.module.scss";
import Button from "./../button/index";
import { Link } from "react-router-dom";

type vacancy = {
  header: string;
  description: string;
  disableButton: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  linkToId: number;
  hideButton?: boolean;
  className?: string;
  hideLink?: boolean;
  disableTextSlice?: boolean;
};

const Vacancy: React.FC<vacancy> = (props) => {
  const {
    header,
    description,
    disableButton,
    onClick,
    hideButton,
    className,
    linkToId,
    hideLink,
    disableTextSlice,
  } = props;

  return (
    <Box
      className={cn(style.root, className)}
      header={header}
      body={
        <>
          <div className={cn({ [style.description]: !disableTextSlice })}>
            {description}
          </div>
          <div>
            <div className={style.buttons}>
              {!hideButton && (
                <Button
                  onClick={onClick}
                  text={"Откликнуться"}
                  disableFill={disableButton}
                />
              )}
              {!hideLink && <Link to={`/vacancy/${linkToId}`}>Подробнее</Link>}
            </div>
          </div>
        </>
      }
    />
  );
};

export default Vacancy;
