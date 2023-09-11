import "./Popup.css";
import { useSnapshot } from "valtio";
import { actions, state } from "../../../state";

const Popup: React.FC = () => {
  const snap = useSnapshot(state);

  return snap.popup ? (
    <div className="alert">
      <span className="closebtn" onClick={() => actions.removePopup()}>
        &times;
      </span>
      {snap.popupText}
    </div>
  ) : null;
};

export default Popup;
