import {
  Login,
  Home,
  Discussions,
  Detail,
  CreateDiscussion,
  UpdateDiscussion,
  DeleteDiscussion,
  Logout,
  CreateComment,
  DeleteComment,
} from "./pages/index";
import { actions, state } from "./state";
import { useSnapshot } from "valtio";
import { CSSTransition } from "react-transition-group";
import { useEffect } from "react";
import { AppPage } from "./types";
import { verifyTokenPayload } from "./utils/token";
import { Loader } from "./components/ui";

const routeConfig = {
  [AppPage.Loader]: Loader,
  [AppPage.Login]: Login,
  [AppPage.Home]: Home,
  [AppPage.Discussions]: Discussions,
  [AppPage.Detail]: Detail,
  [AppPage.CreateDiscussion]: CreateDiscussion,
  [AppPage.UpdateDiscussion]: UpdateDiscussion,
  [AppPage.DeleteDiscussion]: DeleteDiscussion,
  [AppPage.Logout]: Logout,
  [AppPage.CreateComment]: CreateComment,
  [AppPage.DeleteComment]: DeleteComment,
};

const Pages: React.FC = () => {
  const snap = useSnapshot(state);
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!snap.user && !user) {
      actions.setPage(AppPage.Login);
    } else if (!snap.user && user) {
      verifyTokenPayload(user);
    } else {
      actions.setPage(AppPage.Home);
    }
  }, [snap.user, user]);

  return (
    <>
      {Object.entries(routeConfig).map(([page, Component]) => (
        <CSSTransition
          key={page}
          in={page === snap.currentPage}
          timeout={500}
          classNames="page"
          unmountOnExit
        >
          <div className="page max-w-screen-sm mx-auto py-8 px-4 overflow-y-auto">
            <Component />
          </div>
        </CSSTransition>
      ))}
    </>
  );
};

export default Pages;
