import { useSnapshot } from "valtio";
import { actions, state } from "../../../state";

const Popup: React.FC = () => {
  const snap = useSnapshot(state);

  return snap.toast ? (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      className={`alert alert-${snap.toastType}`}
    >
      {snap.toastText}
      <button className="btn" onClick={() => actions.removeToast()}>
        <span>&times;</span>
      </button>
    </div>
  ) : null;
};

export default Popup;
