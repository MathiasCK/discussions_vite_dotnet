import { actions } from "../state";
import { AppPage, Discussion } from "../types";
import { fetcher } from "../utils/fetcher";

export const fetchDiscussions = async () => {
  const discussions: Array<Discussion> = await fetcher(
    "http://localhost:5000/api/discussions",
  );
  actions.setDiscussions(discussions);
};

export const fetchDiscussion = async (id: string) => {
  const discussion: Discussion = await fetcher(
    `http://localhost:5000/api/discussions/${id}`,
  );
  actions.setDiscussion(discussion);
};

export const createDiscussion = async (discussion: Discussion) => {
  const createdDiscussion: Discussion = await fetcher(
    `http://localhost:5000/api/discussions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discussion),
    },
  );

  actions.setDiscussion(createdDiscussion);
  actions.setPage(AppPage.Detail);
};

export const updateDiscussion = async (discussion: Discussion) => {
  const updatedDiscussion: Discussion = await fetcher(
    `http://localhost:5000/api/discussions/${discussion.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discussion),
    },
  );
  actions.setDiscussion(updatedDiscussion);
  actions.setPage(AppPage.Detail);
};
