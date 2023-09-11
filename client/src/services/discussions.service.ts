import { actions } from "../state";
import { AppPage, Discussion } from "../types";
import { fetcher } from "../utils/fetcher";
import { displayPopup } from "../utils/popup";

export const fetchDiscussions = async () => {
  const discussions: Array<Discussion> = await fetcher(
    "http://localhost:5000/api/discussions",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );
  actions.setDiscussions(discussions);
};

export const fetchDiscussion = async (id: string) => {
  const discussion: Discussion = await fetcher(
    `http://localhost:5000/api/discussions/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
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
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(discussion),
    },
  );
  actions.setDiscussion(updatedDiscussion);
  actions.setPage(AppPage.Detail);
};

export const deleteDiscussion = async (id: string) => {
  const response = await fetch(`http://localhost:5000/api/discussions/${id}`, {
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
    displayPopup(`${status} : ${message}`);
    return;
  }

  actions.removeDiscussion();
  actions.setPage(AppPage.Discussions);
};
