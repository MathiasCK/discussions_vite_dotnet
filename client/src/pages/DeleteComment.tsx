import React from "react";
import { useSnapshot } from "valtio";
import { actions, state } from "../state";
import { AppPage } from "../types";
import { deleteComment } from "../services/comments.service";

const DeleteComment = () => {
  const snap = useSnapshot(state);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (snap.comment.id) {
      await deleteComment(snap.comment.id, snap.comment.discussionId);
    }
  };
  return (
    <React.Fragment>
      <h4 className="lead">
        Are you sure you want to delete your comment "{snap.comment.text}"
      </h4>

      <form onSubmit={handleSubmit} method="post">
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

export default DeleteComment;
