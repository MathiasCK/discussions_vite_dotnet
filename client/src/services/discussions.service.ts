import { SERVER_URL } from "../config";
import { actions } from "../state";
import { AppPage, Discussion } from "../types";
import { handleResponse } from "../utils/handlers";
import { MessageToast } from "../utils/toast";
import { checkLocalStorage } from "../utils/token";

const discussionsUrl = `${SERVER_URL}/api/discussions`;

export const fetchDiscussions = async () => {
  try {
    const token = checkLocalStorage();

    actions.startLoading();

    const response = await fetch(discussionsUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    handleResponse(response);

    const discussions: Array<Discussion> = await response.json();
    actions.setDiscussions(discussions);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    MessageToast.error(e.message);
  } finally {
    setTimeout(() => actions.stopLoading(), 500);
  }
};

export const fetchDiscussion = async (id: string) => {
  try {
    const token = checkLocalStorage();

    actions.startLoading();

    const response = await fetch(`${discussionsUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    handleResponse(response);

    const discussion: Discussion = await response.json();
    actions.setDiscussion(discussion);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    MessageToast.error(e.message);
  } finally {
    actions.stopLoading();
  }
};

export const createDiscussion = async (discussion: Discussion) => {
  try {
    const token = checkLocalStorage();

    actions.startLoading();

    const response = await fetch(discussionsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(discussion),
    });

    handleResponse(response);

    const createdDiscussion: Discussion = await response.json();

    actions.setDiscussion(createdDiscussion);
    actions.setPage(AppPage.Detail);
    MessageToast.success("Discussion creation successful");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    MessageToast.error(e.message);
  } finally {
    actions.stopLoading();
  }
};

export const updateDiscussion = async (discussion: Discussion) => {
  try {
    const token = checkLocalStorage();

    actions.startLoading();

    const response = await fetch(`${discussionsUrl}/${discussion.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(discussion),
    });

    handleResponse(response);

    const updatedDiscussion: Discussion = await response.json();

    actions.setDiscussion(updatedDiscussion);
    actions.setPage(AppPage.Detail);
    MessageToast.show("Discussion updated");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    MessageToast.error(e.message);
  } finally {
    actions.stopLoading();
  }
};

export const deleteDiscussion = async (id: string) => {
  try {
    const token = checkLocalStorage();

    actions.startLoading();

    const response = await fetch(`${discussionsUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(id),
    });

    handleResponse(response);

    actions.removeDiscussion();
    actions.setPage(AppPage.Discussions);
    MessageToast.show("Discussion deleted");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    MessageToast.error(e.message);
  } finally {
    actions.stopLoading();
  }
};
