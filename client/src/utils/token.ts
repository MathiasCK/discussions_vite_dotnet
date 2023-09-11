import { actions } from "../state";
import { AppPage } from "../types";

export const verifyTokenPayload = (user: string) => {
  const currentTimeSeconds = Date.now() / 1000;
  const token = localStorage.getItem("token");

  if (!token) {
    actions.removeUser();
    return;
  }

  const { exp: tokenExp } = JSON.parse(atob(token.split(".")[1]));

  if (tokenExp < currentTimeSeconds - 10 || !token) {
    actions.removeUser();
    return;
  }
  actions.setUser(JSON.parse(user));
  actions.setPage(AppPage.Home);
};
