import React from "react";
import cn from "classnames";

import style from "./index.module.scss";

type button = {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  name?: string;
  disableFill?: boolean;
  className?: string;
};

const Button: React.FC<button> = (props) => {
  const { text, disableFill, className, onClick, name } = props;
  return (
    <button
      className={cn(style.root, className, {
        [style.disableFill]: disableFill,
      })}
      onClick={onClick}
      name={name}
    >
      {text}
    </button>
  );
};

export default Button;
