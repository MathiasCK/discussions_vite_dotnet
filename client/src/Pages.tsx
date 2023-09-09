import { Login, Home } from "./pages/index";
import { AppPage, actions, state } from "./state";
import { useSnapshot } from "valtio";
import { CSSTransition } from "react-transition-group";
import { useEffect } from "react";

const routeConfig = {
  [AppPage.Login]: Login,
  [AppPage.Home]: Home,
};

const Pages: React.FC = () => {
  const snap = useSnapshot(state);

  useEffect(() => {
    if (snap.user === null) {
      actions.setPage(AppPage.Login);
    } else {
      actions.setPage(AppPage.Home);
    }
  }, [snap.user]);

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
