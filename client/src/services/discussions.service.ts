import { actions } from "../state";
import { Discussion } from "../types";

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
