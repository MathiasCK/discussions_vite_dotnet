import { SERVER_URL } from "../config";
import { actions } from "../state";
import { AppPage, Discussion } from "../types";
import { displayPopup } from "../utils/popup";

const discussionsUrl = `${SERVER_URL}/api/discussions`;

export const fetchDiscussions = async () => {
  try {
    const response = await fetch(discussionsUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      const { status } = response;
      const message = await response.text();
      throw new Error(`${status} : ${message}`);
    }

    const discussions: Array<Discussion> = await response.json();
    actions.setDiscussions(discussions);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    displayPopup(e.message);
  }
};

export const fetchDiscussion = async (id: string) => {
  try {
    const response = await fetch(`${discussionsUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      const { status } = response;
      const message = await response.text();
      throw new Error(`${status} : ${message}`);
    }

    const discussion: Discussion = await response.json();
    actions.setDiscussion(discussion);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    displayPopup(e.message);
  }
};

export const createDiscussion = async (discussion: Discussion) => {
  try {
    actions.startLoading();

    const response = await fetch(discussionsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(discussion),
    });

    if (!response.ok) {
      const { status } = response;
      const message = await response.text();
      throw new Error(`${status} : ${message}`);
    }

    const createdDiscussion: Discussion = await response.json();

    actions.setDiscussion(createdDiscussion);
    actions.setPage(AppPage.Detail);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    displayPopup(e.message);
  } finally {
    actions.stopLoading();
  }
};

export const updateDiscussion = async (discussion: Discussion) => {
  try {
    actions.startLoading();

    const response = await fetch(`${discussionsUrl}/${discussion.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(discussion),
    });

    if (!response.ok) {
      const { status } = response;
      const message = await response.text();
      throw new Error(`${status} : ${message}`);
    }

    const updatedDiscussion: Discussion = await response.json();

    actions.setDiscussion(updatedDiscussion);
    actions.setPage(AppPage.Detail);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    displayPopup(e.message);
  } finally {
    actions.stopLoading();
  }
};

export const deleteDiscussion = async (id: string) => {
  try {
    actions.startLoading();

    const response = await fetch(`${discussionsUrl}/${id}`, {
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

    actions.removeDiscussion();
    actions.setPage(AppPage.Discussions);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    displayPopup(e.message);
  } finally {
    actions.stopLoading();
  }
};
