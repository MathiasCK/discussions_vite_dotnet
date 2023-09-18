import { actions } from "../state";
import { displayPopup } from "./popup";

export const fetcher = async (
  url: string,
  requestParams: RequestInit | undefined = {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  actions.startLoading();
  const response = await fetch(url, requestParams);

  if (!response.ok) {
    const { status } = response;
    const message = await response.text();
    displayPopup(`${status} : ${message}`);
    actions.stopLoading();
    return;
  }

  actions.stopLoading();
  return await response.json();
};
