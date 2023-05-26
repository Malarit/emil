import React from "react";
import Box from "../../components/box";
import next from "../../assets/img/about/zxc.png";

import style from "./index.module.scss";

const About: React.FC = () => {
  return (
    <div className={style.root}>
      <div className={style.container}>
        <div className={style.body}>
          <div>
            <Box
              header="Мы уже 1000 лет занимаем лидирующие позиции по созданию веб сайтов"
              body={
                <>
                  <div>
                    Тинькофф — онлайн-экосистема, основанная на финансовых и
                    лайфстайл-услугах.
                  </div>
                  <div>
                    Клиентами Тинькофф стали 30 млн человек по всей России.
                    Тинькофф — третий крупнейший банк страны по количеству
                    активных клиентов.
                  </div>
                  <img src={next} alt="" />
                </>
              }
              className={style.create}
            />
          </div>
          <div>
            <Box
              header="Полностью онлайн. Всегда рядом"
              body={
                <>
                  {[
                    { img: "", h: "Нет отделений и очередей" },
                    { img: "", h: "Помогаем сразу" },
                    { img: "", h: "Доставим быстро" },
                    { img: "", h: "Всегда на связи" },
                  ].map((item) => (
                    <Box header={item.h} body={""} />
                  ))}
                </>
              }
              className={style.directions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
