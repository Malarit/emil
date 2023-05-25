import React from "react";
import Box from "../../components/box";
import HeaderContainer from "../../containers/header/header.container";

import style from "./index.module.scss";

import next from "../../assets/img/home/next.jpg";

const Home: React.FC = () => {
  return (
    <div className={style.root}>
      <div className={style.container}>
        <div className={style.body}>
          <div>
            <Box
              header="Создавайте будущее вместе с нами"
              body={
                <>
                  <div>
                    Присоединяйтесь к нашей команде: мы создаем финтех-сервисы
                    для 30 млн клиентов и опережаем рынок на 5 лет
                  </div>
                  <div>
                    Работаем на результат и делаем больше, чем от нас ждут
                  </div>
                  <img src={next} alt="" />
                </>
              }
              className={style.create}
            />
          </div>
          <div>
            <Box
              header="Напраления"
              body={
                <>
                  <div>
                    Присоединяйтесь к нашей команде: мы создаем финтех-сервисы
                    для 30 млн клиентов и опережаем рынок на 5 лет
                  </div>
                  <div>
                    <div>
                      Развивайте проекты: вас ждут интересные задачи по
                      тестированию, системной аналитике, разработке
                    </div>
                    <div>
                      Вакансии для опытных бухгалтеров, маркетологов, юристов,
                      управленцев, менеджеров В2В и инвестиций
                    </div>
                    <div>
                      Консультируйте клиентов, продавайте или оставляйте
                      банковские продукты. Без опыта и по всей России
                    </div>
                  </div>
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

export default Home;
