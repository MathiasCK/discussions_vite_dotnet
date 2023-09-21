import { User, Discussion, Comment } from "../types";

export const testUser: User = { id: "111", email: "john@doe.com" };

export const testDiscussion: Discussion = {
  id: "222",
  topic: "Test topic",
  body: "Test body",
  author: testUser,
};

export const testComment: Comment = {
  id: "333",
  text: "Test comment",
  author: testUser,
  discussionId: "222",
};
