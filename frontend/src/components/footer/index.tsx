import React from "react";

import style from "./index.module.scss";

import vk from "../../assets/icons/vk.svg";
import telegramm from "../../assets/icons/telegramm.svg";

const Footer: React.FC = () => {
  return (
    <div className={style.root}>
      <div className={style.container}>
        <hr />
        <div className={style.wrapper}>
          <div>
            © 2006—2023, АО «К», официальный сайт, универсальная лицензия ЦБ РФ
            № 2673
          </div>
          <div>
            <a href="">
              <img src={vk} alt="" />
            </a>
            <a href="">
              <img src={telegramm} alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
