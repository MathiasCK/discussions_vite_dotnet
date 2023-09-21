import { actions } from "../state";
import { displayPopup } from "./popup";

export const verifyTokenPayload = (token: string) => {
  const currentTimeSeconds = Date.now() / 1000;

  const { exp: tokenExp } = JSON.parse(atob(token.split(".")[1]));

  if (tokenExp < currentTimeSeconds - 10) {
    displayPopup("Session expired");
    actions.removeUser();
    return false;
  }

  return true;
};
