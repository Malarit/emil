import React from "react";

import style from "./index.module.scss";

type header = {
  list: JSX.Element[];
};

const Header: React.FC<header> = ({ list }) => {
  return (
    <div className={style.container}>
      <div className={style.root}>
        <div className={style.buttons}>{list}</div>
      </div>
    </div>
  );
};

export default Header;
