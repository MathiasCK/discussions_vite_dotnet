import React, { useState } from "react";
import { actions, state } from "../state";
import { AppPage, Comment } from "../types";
import { useSnapshot } from "valtio";
import { createComment } from "../services/comments.service";

const CreateComment = () => {
  const snap = useSnapshot(state);
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();

    if (snap.discussion.id && snap.user) {
      const comment: Comment = {
        discussionId: snap.discussion.id,
        text,
        author: {
          email: snap.user.email,
        },
      };
      await createComment(comment);
    }
  };
  return (
    <React.Fragment>
      <h4 className="lead">
        Create new comment for discussion "{snap.discussion.topic}"
      </h4>

      <form onSubmit={handleSubmit} method="post">
        <div className="form-group">
          <label htmlFor="comment">Text</label>
          <span className="text-danger">*</span>
          <input
            value={text}
            name="comment"
            className="form-control"
            required
            placeholder="Comment ...."
            onChange={e => setText(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <button
            type="submit"
            className="btn btn-success"
            style={{ marginRight: "5px" }}
          >
            Create
          </button>
          <a
            onClick={() => actions.setPage(AppPage.Detail)}
            className="btn btn-primary"
          >
            Back to Discussion
          </a>
        </div>
      </form>
    </React.Fragment>
  );
};

export default CreateComment;
