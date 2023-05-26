import { screens } from "../redux/slices/screen/types";

const route = {
  main: "/",
  about: "/about",
  vacancy: "/vacancy",
  login: "/login",
};

const getRoute = (key: screens) => {
  return route[key as keyof typeof route];
};

export const getRouteByValue = (value: string) => {
  return Object.keys(route).find(
    (key) => route[key as keyof typeof route] === value
  ) as screens;
};

export default getRoute;
