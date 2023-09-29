import { SERVER_URL } from "../config";
import { actions } from "../state";
import { AppPage, Comment } from "../types";
import { handleResponse } from "../utils/handlers";
import { MessageToast } from "../utils/toast";
import { checkLocalStorage } from "../utils/token";
import { fetchDiscussion } from "./discussions.service";

const commentsUrl = `${SERVER_URL}/api/comments`;

export const createComment = async (comment: Comment) => {
  try {
    const token = checkLocalStorage();

    actions.startLoading();

    const response = await fetch(commentsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(comment),
    });

    handleResponse(response);

    await fetchDiscussion(comment.discussionId);
    actions.setPage(AppPage.Detail);
    MessageToast.success("Comment creation successful");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    MessageToast.error(e.message);
  } finally {
    actions.stopLoading();
  }
};

export const deleteComment = async (id: string, discussionId: string) => {
  try {
    const token = checkLocalStorage();

    actions.startLoading();

    const response = await fetch(`${commentsUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(id),
    });

    handleResponse(response);

    await fetchDiscussion(discussionId);
    actions.removeComment();
    actions.setPage(AppPage.Detail);
    MessageToast.show("Comment deleted");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    MessageToast.error(e.message);
  } finally {
    actions.stopLoading();
  }
};
