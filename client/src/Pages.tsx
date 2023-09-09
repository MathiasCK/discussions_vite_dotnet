import { Login, Home, Discussions } from "./pages/index";
import { actions, state } from "./state";
import { useSnapshot } from "valtio";
import { CSSTransition } from "react-transition-group";
import { useEffect } from "react";
import { AppPage } from "./types";

const routeConfig = {
  [AppPage.Login]: Login,
  [AppPage.Home]: Home,
  [AppPage.Discussions]: Discussions,
};

const Pages: React.FC = () => {
  const snap = useSnapshot(state);
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!snap.user && !user) {
      actions.setPage(AppPage.Login);
    } else if (!snap.user && user) {
      actions.setUser(JSON.parse(user));
      actions.setPage(AppPage.Home);
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
          timeout={300}
          classNames="page"
          unmountOnExit
        >
          <Component />
        </CSSTransition>
      ))}
    </>
  );
};

export default Pages;
