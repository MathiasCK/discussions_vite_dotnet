import { useSnapshot } from "valtio";
import { actions, state } from "../../state";
import { formatDateTime } from "../../utils/format";
import { AppPage } from "../../types";

const DiscussionDetails: React.FC = () => {
  const snap = useSnapshot(state);
  return (
    <article className="card">
      <div className="card-header">{snap.discussion.topic}</div>
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <div className="mb-2">
            <p>{snap.discussion.body}</p>
          </div>
          <footer className="blockquote-footer">
            <cite title="Source Title">{snap.discussion.author?.email}</cite>
          </footer>
          {snap?.user?.id == snap.discussion?.author?.id && (
            <>
              <a
                onClick={() => actions.setPage(AppPage.UpdateDiscussion)}
                className="btn btn-warning"
              >
                Update
              </a>
              <a
                onClick={() => actions.setPage(AppPage.DeleteDiscussion)}
                className="btn btn-danger"
              >
                Delete
              </a>
            </>
          )}
        </blockquote>
      </div>
      {snap.discussion.created && (
        <div className="card-footer text-muted date">
          {formatDateTime(snap.discussion.created)}
        </div>
      )}
    </article>
  );
};

export default DiscussionDetails;
