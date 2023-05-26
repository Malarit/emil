import React from "react";

import VacancyContainer from "../../containers/vacancy/vacancy.container";

import style from "./index.module.scss";

const Vacancy: React.FC = () => {
  return (
    <div className={style.root}>
      <div className={style.container}>
        <VacancyContainer />
      </div>
    </div>
  );
};

export default Vacancy;
