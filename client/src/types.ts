export enum AppPage {
  Login = "login",
  Home = "home",
  Discussions = "discussions",
}

export type AppState = {
  currentPage: AppPage;
  isLoading: boolean;
  user: User | null;
  discussions: Array<Discussion> | [];
};

export type User = {
  id?: string;
  email: string;
};

export type Discussion = {
  id: string;
  topic: string;
  body: string;
  author: User;
  created: string;
  updated: string;
  //comments: Array<Comment>;
};
