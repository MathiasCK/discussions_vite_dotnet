import { useSnapshot } from "valtio";
import { state } from "../state";

const Home: React.FC = () => {
  const snap = useSnapshot(state);
  return (
    <header className="row mb-5">
      <div className="col text-center">
        <h1 className="display-3">Welcome {snap.user?.email}</h1>
        <p className="lead">Join or create a discussion</p>
        <a className="btn btn-outline-primary btn-lg">View Discussions</a>
      </div>
    </header>
  );
};

export default Home;
