import { useSnapshot } from "valtio";
import { actions, state } from "../state";
import { AppPage } from "../types";

const Verify = () => {
  const snap = useSnapshot(state);

  return (
    <header className="row mb-5">
      <div className="col text-center">
        <h1 className="display-3">{snap.verificationEmail}</h1>
        <p className="lead">
          Please check your email, including your spam folder, to verify your
          account
        </p>
        <span className="lead">
          Wrong email? {""}
          <a onClick={() => actions.setPage(AppPage.Login)} className="">
            Click here
          </a>
        </span>
      </div>
    </header>
  );
};

export default Verify;
