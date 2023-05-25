export const SCREENS = <const>["main", "vacancy", "about", "login"];

export type screens = (typeof SCREENS)[number];

export type screen = {
  activeScreen: screens;
};

export function isScreens(str: string): str is screens {
  return !!SCREENS.find((screen) => str === screen);
}
