import { actions } from "../state";
import { AppPage, Discussion } from "../types";

export const fetchDiscussions = async () => {
  const response = await fetch("http://localhost:5000/api/discussions");

  if (!response.ok) {
    const { status } = response;
    const message = await response.text();
    alert(`${status} : ${message}`);
    return;
  }

  const discussions: Array<Discussion> = await response.json();
  actions.setDiscussions(discussions);
};

export const fetchDiscussion = async (id: string) => {
  const response = await fetch(`http://localhost:5000/api/discussions/${id}`);

  if (!response.ok) {
    const { status } = response;
    const message = await response.text();
    alert(`${status} : ${message}`);
    return;
  }

  const discussion: Discussion = await response.json();
  actions.setDiscussion(discussion);
};

export const createDiscussion = async (discussion: Discussion) => {
  const response = await fetch(`http://localhost:5000/api/discussions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(discussion),
  });

  if (!response.ok) {
    const { status } = response;
    const message = await response.text();
    alert(`${status} : ${message}`);
    return;
  }

  const data = await response.json();
  actions.setDiscussion(data);
  actions.setPage(AppPage.Detail);
};
