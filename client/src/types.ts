export enum AppPage {
  Login = "login",
  Home = "home",
  Discussions = "discussions",
  Detail = "detail",
  CreateDiscussion = "createDiscussion",
  UpdateDiscussion = "updateDiscussion",
  DeleteDiscussion = "deleteDiscussion",
  Logout = "logout",
}

export type AppState = {
  currentPage: AppPage;
  isLoading: boolean;
  user: User | null;
  discussions: Array<Discussion> | [];
  discussion: Discussion | Record<string, never>;
};

export type User = {
  id?: string;
  email: string;
};

export type Comment = {
  id: string;
  dicsussionId: string;
  text: string;
  author: User;
  created: string;
};

export type Discussion = {
  id?: string;
  topic: string;
  body: string;
  author?: User;
  created?: string;
  updated?: string;
  comments?: Array<Comment>;
};
