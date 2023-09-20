import { SERVER_URL } from "../config";
import { actions } from "../state";
import { AppPage, Comment } from "../types";
import { displayPopup } from "../utils/popup";
import { fetchDiscussion } from "./discussions.service";

const commentsUrl = `${SERVER_URL}/api/comments`;

export const createComment = async (comment: Comment) => {
  try {
    actions.startLoading();

    const response = await fetch(commentsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(comment),
    });

    if (!response.ok) {
      const { status } = response;
      const message = await response.text();
      throw new Error(`${status} : ${message}`);
    }

    await fetchDiscussion(comment.discussionId);
    actions.setPage(AppPage.Detail);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    displayPopup(e.message);
  } finally {
    actions.stopLoading();
  }
};

export const deleteComment = async (id: string, discussionId: string) => {
  try {
    actions.startLoading();

    const response = await fetch(`${commentsUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(id),
    });

    if (!response.ok) {
      const { status } = response;
      const message = await response.text();
      throw new Error(`${status} : ${message}`);
    }

    await fetchDiscussion(discussionId);
    actions.removeComment();
    actions.setPage(AppPage.Detail);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    displayPopup(e.message);
  } finally {
    actions.stopLoading();
  }
};
