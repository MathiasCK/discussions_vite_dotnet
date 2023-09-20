import React, { useState } from "react";
import { useSnapshot } from "valtio";
import { actions, state } from "../state";
import { AppPage, Discussion } from "../types";
import { updateDiscussion } from "../services/discussions.service";
import { displayPopup } from "../utils/popup";

const UpdateDiscussion: React.FC = () => {
  const snap = useSnapshot(state);

  const [topic, setTopic] = useState(snap.discussion.topic);
  const [body, setBody] = useState(snap.discussion.body);

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();

    if (!snap.user) {
      displayPopup("Session expired");
      actions.removeUser();
      return;
    }

    const discussion: Discussion = {
      id: snap.discussion.id,
      topic,
      body,
      author: {
        email: snap.user.email,
      },
    };
    await updateDiscussion(discussion);
  };

  return (
    <React.Fragment>
      <h4 className="lead">Update discussion: "{snap.discussion.topic}"</h4>

      <form onSubmit={handleSubmit} method="put">
        <div className="form-group">
          <label htmlFor="Topic">Topic</label>
          <span className="text-danger">*</span>
          <input
            value={topic}
            required
            name="Topic"
            className="form-control"
            placeholder="Topic ..."
            onChange={e => setTopic(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Body">Topic</label>
          <span className="text-danger">*</span>
          <input
            value={body}
            required
            name="Body"
            className="form-control"
            placeholder="Body ..."
            onChange={e => setBody(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <button type="submit" className="btn btn-warning">
            Update
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

export default UpdateDiscussion;
