import { useSnapshot } from "valtio";
import { actions, state } from "../state";
import { AppPage } from "../types";

const Home: React.FC = () => {
  const snap = useSnapshot(state);
  const handleRoute = () => actions.setPage(AppPage.Discussions);
  return (
    <header className="row mb-5">
      <div className="col text-center">
        <h1 className="display-3">Welcome {snap.user?.email}</h1>
        <p className="lead">Join or create a discussion</p>
        <button
          onClick={handleRoute}
          className="btn btn-outline-primary btn-lg"
        >
          View Discussions
        </button>
      </div>
    </header>
  );
};

export default Home;
