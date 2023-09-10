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
