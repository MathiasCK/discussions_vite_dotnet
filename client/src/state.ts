import { proxy } from "valtio";

export enum AppPage {
  Login = "login",
  Home = "home",
}

export type AppState = {
  currentPage: AppPage;
  isLoading: boolean;
  user: User | null;
};

export type User = {
  id?: string;
  email: string;
};

const state = proxy<AppState>({
  currentPage: AppPage.Login,
  isLoading: false,
  user: null,
});

const actions = {
  setPage: (page: AppPage): void => {
    state.currentPage = page;
  },
  startLoading: (): void => {
    state.isLoading = true;
  },
  stopLoading: (): void => {
    state.isLoading = false;
  },
  setUser: (user: User): void => {
    localStorage.setItem("user", JSON.stringify(user));
    state.user = user;
  },
};

export { state, actions };
