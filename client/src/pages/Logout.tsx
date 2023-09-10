import React from "react";
import { actions } from "../state";
import { AppPage } from "../types";

const Logout = () => {
  return (
    <React.Fragment>
      <h4>Are you sure you want to logout?</h4>

      <form>
        <button
          onClick={() => actions.removeUser()}
          type="submit"
          className="btn btn-danger"
        >
          Yes, logout
        </button>
        <a
          onClick={() => actions.setPage(AppPage.Discussions)}
          className="btn btn-primary"
        >
          Cancel
        </a>
      </form>
    </React.Fragment>
  );
};

export default Logout;
