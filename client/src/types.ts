export enum AppPage {
  Loader = "loader",
  Login = "login",
  Home = "home",
  Discussions = "discussions",
  Detail = "detail",
  CreateDiscussion = "createDiscussion",
  UpdateDiscussion = "updateDiscussion",
  DeleteDiscussion = "deleteDiscussion",
  Logout = "logout",
  CreateComment = "createComment",
  DeleteComment = "deleteComment",
  Verify = "verify",
}

export type AppState = {
  currentPage: AppPage;
  isLoading: boolean;
  popup: boolean;
  popupText: string;
  user: User | null;
  discussions: Array<Discussion> | [];
  discussion: Discussion | Record<string, never>;
  comment: Comment | Record<string, never>;
  verificationEmail: string | null;
};

export type User = {
  id?: string;
  email: string;
};

export type Comment = {
  id?: string;
  discussionId: string;
  text: string;
  author: User;
  created?: string;
};

export type Discussion = {
  id?: string;
  topic: string;
  body: string;
  author: User;
  created?: string;
  updated?: string;
  comments?: Array<Comment>;
};
