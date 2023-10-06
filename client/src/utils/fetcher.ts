import { actions } from "../state";
import { AppPage, Discussion, RequestData, RequestType } from "../types";
import { handleResponse } from "./handlers";
import { MessageToast } from "./toast";
import { checkLocalStorage } from "./token";

export const discussionsFetcher = async (
  url: string,
  method: RequestType,
  data?: RequestData,
  fetchAll?: boolean,
) => {
  try {
    actions.startLoading();

    const token = checkLocalStorage();

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    handleResponse(response);

    if (method === "GET" && fetchAll) {
      const discussions: Array<Discussion> = await response.json();
      actions.setDiscussions(discussions);
      return;
    } else if (method === "GET") {
      const discussion: Discussion = await response.json();
      actions.setDiscussion(discussion);
      return;
    } else if (method === "POST") {
      const createdDiscussion: Discussion = await response.json();

      actions.setDiscussion(createdDiscussion);
      actions.setPage(AppPage.Detail);
      MessageToast.success("Discussion creation successful");
      return;
    } else if (method === "PUT") {
      const updatedDiscussion: Discussion = await response.json();

      actions.setDiscussion(updatedDiscussion);
      actions.setPage(AppPage.Detail);
      MessageToast.success("Discussion successfully updated");
      return;
    }

    actions.removeDiscussion();
    actions.setPage(AppPage.Discussions);
    MessageToast.success("Discussion successfully deleted");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    MessageToast.error(e.message);
  } finally {
    actions.stopLoading();
  }
};
