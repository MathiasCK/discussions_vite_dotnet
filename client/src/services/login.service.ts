import { SERVER_URL } from "../config";
import { actions } from "../state";
import { AppPage } from "../types";
import { handleResponse } from "../utils/handlers";
import { displayPopup } from "../utils/popup";

const loginUrl = `${SERVER_URL}/api/login`;

export const login = async (email: string): Promise<void> => {
  try {
    actions.startLoading();

    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    handleResponse(response);

    const data = await response.text();

    actions.setVerificationEmail(data);
    actions.setPage(AppPage.Verify);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    displayPopup(e.message);
  } finally {
    actions.stopLoading();
  }
};
