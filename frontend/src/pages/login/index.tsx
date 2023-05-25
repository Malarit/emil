import React from "react";
import AuthContainer from "../../containers/login/auth.container";
import { useAppSelector } from "../../redux/hooks";

import style from "./index.module.scss";
import { selectUserId } from "./../../redux/slices/account/selectors";
import ProfileContainer from "../../containers/login/profile.container";
import MyFeedBackContainer from "../../containers/login/myFeedBack.container";

const Login: React.FC = () => {
  const userId = useAppSelector(selectUserId);

  return (
    <div className={style.root}>
      <div className={style.container}>
        {userId ? (
          <>
            <div>
              <ProfileContainer />
            </div>
            <div>
              <MyFeedBackContainer className={style.myFeed} classNameBox={style.box} />
            </div>
          </>
        ) : (
          <AuthContainer />
        )}
      </div>
    </div>
  );
};

export default Login;
