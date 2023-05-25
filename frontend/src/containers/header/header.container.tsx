import { useNavigate } from "react-router-dom";
import getRoute from "../../route/getRoute";

import { setActiveScreen } from "../../redux/slices/screen/slice";
import { isScreens, screens } from "../../redux/slices/screen/types";
import { useAppDispatch, useAppSelector } from "./../../redux/hooks";
import { selectActiveScreen } from "./../../redux/slices/screen/selectors";

import Button from "../../components/button";
import Header from "../../components/header";
import { selectUserId } from "../../redux/slices/account/selectors";
import { useQuery } from "react-query";
import { getUser } from "../../services/req";

const HeaderContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeScreen = useAppSelector(selectActiveScreen);
  const userId = useAppSelector(selectUserId);
  const navigate = useNavigate();
  const { data } = useQuery("user", getUser, {
    refetchOnWindowFocus: false,
  });
  const onClickButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const buttonName = e.currentTarget.name;
    if (isScreens(buttonName)) {
      navigate(getRoute(buttonName));
      dispatch(setActiveScreen(buttonName));
    }
  };

  const listButton: { name: screens; text: string; disableFill?: boolean }[] = [
    { text: "Главная", name: "main" },
    { text: "О нас", name: "about" },
    { text: "Вакансии", name: "vacancy" },
    {
      text: userId
        ? `${data?.firstName + " " + data?.secondName}`
        : "Войти / Зарегистрироваться",
      name: "login",
    },
  ];

  const listButtonJsx = listButton.map((item) => (
    <Button
      key={item.name}
      {...item}
      disableFill={item.name !== activeScreen}
      onClick={onClickButton}
    />
  ));

  return <Header list={listButtonJsx} />;
};
export default HeaderContainer;
