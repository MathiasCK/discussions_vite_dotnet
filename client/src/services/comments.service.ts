import { actions } from "../state";
import { AppPage, Comment } from "../types";
import { displayPopup } from "../utils/popup";
import { fetchDiscussion } from "./discussions.service";

const commentsUrl = "http://localhost:5000/api/comments";

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
      actions.stopLoading();
      return displayPopup(`${status} : ${message}`);
    }

    actions.stopLoading();
    await fetchDiscussion(comment.discussionId);
    actions.setPage(AppPage.Detail);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    displayPopup(e.message);
  }
};

export const deleteComment = async (id: string, discussionId: string) => {
  try {
    actions.startLoading();

    const response = await fetch(`http://localhost:5000/api/comments/${id}`, {
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
      actions.stopLoading();
      return displayPopup(`${status} : ${message}`);
    }

    actions.stopLoading();
    await fetchDiscussion(discussionId);
    actions.removeComment();
    actions.setPage(AppPage.Detail);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    displayPopup(e.message);
  }
};
