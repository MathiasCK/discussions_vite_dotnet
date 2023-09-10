import { useSnapshot } from "valtio";
import { actions, state } from "../../../state";
import { AppPage } from "../../../types";

const Navbar = () => {
  const snap = useSnapshot(state);
  return (
    <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
      <div className="container-fluid">
        <a
          onClick={() => {
            snap.user && actions.setPage(AppPage.Home);
          }}
          className="navbar-brand"
        >
          Discussions
        </a>
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
          <ul className="navbar-nav flex-grow-1">
            <li className="nav-item">
              <button
                onClick={() => {
                  snap.user && actions.setPage(AppPage.Home);
                }}
                className="nav-link text-dark"
              >
                Home
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={() => {
                  snap.user && actions.setPage(AppPage.Discussions);
                }}
                className="nav-link text-dark"
              >
                Discussions
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={() => {
                  snap.user && actions.setPage(AppPage.Logout);
                }}
                className="nav-link text-dark"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
