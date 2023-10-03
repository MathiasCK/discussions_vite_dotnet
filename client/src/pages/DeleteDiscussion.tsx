import React from "react";
import { useSnapshot } from "valtio";
import { actions, state } from "../state";
import { AppPage } from "../types";

const DeleteDiscussion = () => {
  const snap = useSnapshot(state);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (snap.discussion?.id) {
      const { deleteDiscussion } = await import(
        "../services/discussions.service"
      );
      await deleteDiscussion(snap.discussion.id);
    }
  };

  return (
    <React.Fragment>
      <h4 className="lead">
        Are you sure you want to delete this Discussion? With topic "
        {snap.discussion?.topic}"
      </h4>

      <form onSubmit={handleSubmit} method="delete">
        <button
          type="submit"
          className="btn btn-danger"
          style={{ marginRight: "5px" }}
        >
          Yes, delete
        </button>
        <a
          onClick={() => actions.setPage(AppPage.Detail)}
          className="btn btn-primary"
        >
          Cancel
        </a>
      </form>
    </React.Fragment>
  );
};

export default DeleteDiscussion;
