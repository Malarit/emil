import React from "react";
import cn from "classnames";

import style from "./index.module.scss";

type list = {
  arr: JSX.Element[];
  className?: string;
};

const List: React.FC<list> = (props) => {
  const { arr, className } = props;

  return <div className={cn(style.root, className)}>{arr}</div>;
};

export default List;
