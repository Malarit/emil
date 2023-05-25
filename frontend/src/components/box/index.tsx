import React from "react";
import cn from "classnames";

import style from "./index.module.scss";

type box = {
  body: string | JSX.Element;
  header?: string;
  className?: string;
  disablePadding?: string;
};

const Box: React.FC<box> = (props) => {
  const { body, header, className, disablePadding } = props;

  return (
    <div
      className={cn(style.root, className, {
        [style.disablePadding]: disablePadding,
      })}
    >
      <h3>{header}</h3>
      <div>{body}</div>
    </div>
  );
};

export default Box;
