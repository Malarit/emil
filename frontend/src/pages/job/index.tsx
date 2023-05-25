import React from "react";
import VacancyContainer from "../../containers/job/vacancy.container";
import { useAppSelector } from "../../redux/hooks";
import { selectUserRole } from "../../redux/slices/account/selectors";

import style from "./index.module.scss";

const Job: React.FC = () => {
  const role = useAppSelector(selectUserRole);

  return (
    <div className={style.root}>
      <div className={style.container}>
        {role == "worker"}
        <div>
          <VacancyContainer className={style.vac} classNameASD={style.asd} />
        </div>
      </div>
    </div>
  );
};

export default Job;
