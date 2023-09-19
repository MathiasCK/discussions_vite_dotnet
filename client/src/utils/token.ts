import { actions } from "../state";

export const verifyTokenPayload = (token: string) => {
  const currentTimeSeconds = Date.now() / 1000;

  if (!token) {
    actions.removeUser();
    return false;
  }

  const { exp: tokenExp } = JSON.parse(atob(token.split(".")[1]));

  if (tokenExp < currentTimeSeconds - 10 || !token) {
    actions.removeUser();
    return false;
  }

  return true;
};
