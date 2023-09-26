import { displayPopup } from "./popup";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleResponse = async (response: any): Promise<void> => {
  if (!response.ok) {
    const { status } = response;
    const message = await response.text();
    const msg = `${status} : ${message}`;
    displayPopup(msg);
    throw new Error(msg);
  }
};
