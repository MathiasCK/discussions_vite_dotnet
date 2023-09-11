import { actions } from "../state";

export const displayPopup = (text: string) => {
  actions.setPopuptext(text);
  actions.setPopup();
  setTimeout(() => {
    actions.removePopup();
  }, 3000);
};
