import { SERVER_URL } from "../config";
import { actions } from "../state";
import { AppPage } from "../types";
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

    if (!response.ok) {
      const { status } = response;
      const message = await response.text();
      throw new Error(`${status} : ${message}`);
    }

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
