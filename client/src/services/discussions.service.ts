import { SERVER_URL } from "../config";
import { Discussion, RequestType } from "../types";
import { discussionsFetcher } from "../utils/fetcher";

const discussionsUrl = `${SERVER_URL}/api/discussions`;

export const fetchDiscussions = async () =>
  await discussionsFetcher(discussionsUrl, RequestType.GET, undefined, true);

export const fetchDiscussion = async (id: string) =>
  await discussionsFetcher(`${discussionsUrl}/${id}`, RequestType.GET);

export const createDiscussion = async (discussion: Discussion) =>
  await discussionsFetcher(discussionsUrl, RequestType.POST, discussion);

export const updateDiscussion = async (discussion: Discussion) =>
  await discussionsFetcher(
    `${discussionsUrl}/${discussion.id}`,
    RequestType.PUT,
    discussion,
  );

export const deleteDiscussion = async (id: string) =>
  await discussionsFetcher(`${discussionsUrl}/${id}`, RequestType.DELETE);
