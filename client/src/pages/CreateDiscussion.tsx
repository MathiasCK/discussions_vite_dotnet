import React, { useState } from "react";
import { actions, state } from "../state";
import { AppPage, Discussion } from "../types";
import { useSnapshot } from "valtio";
import { createDiscussion } from "../services/discussions.service";

const CreateDiscussion: React.FC = () => {
  const snap = useSnapshot(state);

  const [topic, setTopic] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();

    if (!snap.user) {
      alert("Session expired");
      actions.removeUser();
      return;
    }

    const discussion: Discussion = {
      author: snap.user,
      topic,
      body,
    };
    await createDiscussion(discussion);
  };
  return (
    <React.Fragment>
      <h4>Create new discussion</h4>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Topic">Topic</label>
          <span className="text-danger">*</span>
          <input
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder="Topic ..."
            required
            name="Topic"
            className="form-control"
          />
          <span className="text-danger"></span>
        </div>
        <div className="form-group">
          <label htmlFor="Body">Body</label>
          <span className="text-danger">*</span>
          <input
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="Body ..."
            required
            name="Body"
            className="form-control"
          />
          <span className="text-danger"></span>
        </div>
        <div className="mt-2">
          <button type="submit" className="btn btn-success">
            Create
          </button>
          <button
            type="button"
            onClick={() => actions.setPage(AppPage.Discussions)}
            className="btn btn-primary"
          >
            Back to Discussions
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default CreateDiscussion;
