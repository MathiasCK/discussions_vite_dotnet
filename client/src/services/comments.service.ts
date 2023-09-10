import { actions } from "../state";
import { AppPage, Comment } from "../types";
import { fetcher } from "../utils/fetcher";
import { fetchDiscussion } from "./discussions.service";

export const createComment = async (comment: Comment) => {
  await fetcher("http://localhost:5000/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  await fetchDiscussion(comment.discussionId);
  actions.setPage(AppPage.Detail);
};

export const deleteComment = async (id: string, discussionId: string) => {
  const response = await fetch(`http://localhost:5000/api/comments/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });

  if (!response.ok) {
    const { status } = response;
    const message = await response.text();
    alert(`${status} : ${message}`);
    return;
  }

  await fetchDiscussion(discussionId);
  actions.removeComment();
  actions.setPage(AppPage.Detail);
};
