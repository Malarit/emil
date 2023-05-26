import React from "react";

import style from "./index.module.scss";

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={style.root}>{children}</div>;
};

export default Wrapper;
