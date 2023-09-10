import React from "react";
import { useSnapshot } from "valtio";
import { actions, state } from "../../state";
import { formatDateTime } from "../../utils/format";
import { AppPage } from "../../types";

const DiscussionComments: React.FC = () => {
  const snap = useSnapshot(state);
  return (
    <React.Fragment>
      <section className="mt-2 mb-2">
        <h4>Comments</h4>
        <a
          onClick={() => actions.setPage(AppPage.CreateComment)}
          className="btn btn-success"
        >
          Create new comment
        </a>
      </section>
      {snap.discussion.comments &&
        snap.discussion.comments.map(comment => (
          <article
            key={comment.id}
            className="card mb-2"
            style={{ width: "18rem" }}
          >
            <div className="card-body">
              <blockquote className="blockquote mb-0">
                <div className="mb-2">
                  <p>{comment.text}</p>
                </div>
                <footer className="blockquote-footer">
                  <cite title="Source Title">{comment?.author?.email}</cite>
                </footer>
                {snap?.user?.id === comment?.author?.id && (
                  <a className="btn btn-danger">Delete</a>
                )}
              </blockquote>
            </div>
            <div className="card-footer text-muted date">
              {formatDateTime(comment?.created)}
            </div>
          </article>
        ))}
    </React.Fragment>
  );
};

export default DiscussionComments;
