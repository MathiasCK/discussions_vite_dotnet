import { actions } from "../state";
import { AppPage } from "../types";
import { displayPopup } from "../utils/popup";

export const login = async (email: string): Promise<void> => {
  actions.startLoading();

  const response = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });

  if (!response.ok) {
    const { status } = response;
    const message = await response.text();
    displayPopup(`${status} : ${message}`);
    actions.stopLoading();
    return;
  }

  const data = await response.text();
  actions.stopLoading();

  actions.setVerificationEmail(data);
  actions.setPage(AppPage.Verify);
};
