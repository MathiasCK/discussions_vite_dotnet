import { actions } from "../state";
import { MessageToast } from "./toast";

export const verifyTokenPayload = (token: string) => {
  const currentTimeSeconds = Date.now() / 1000;

  const { exp: tokenExp } = JSON.parse(atob(token.split(".")[1]));

  if (tokenExp < currentTimeSeconds - 10) {
    MessageToast.error("Session expired");
    actions.removeUser();
    return false;
  }

  return true;
};

export const checkLocalStorage = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) {
    const msg = "Session expired";
    MessageToast.error(msg);
    actions.removeUser();
    throw new Error(msg);
  }

  return token;
};
