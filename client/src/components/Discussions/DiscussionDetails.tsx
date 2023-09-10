import { useSnapshot } from "valtio";
import { state } from "../../state";
import { formatDateTime } from "../../utils/format";

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
            <cite title="Source Title">{snap.discussion.author.email}</cite>
          </footer>
          {snap?.user?.id == snap.discussion?.author?.id && (
            <>
              <a className="btn btn-warning">Update</a>
              <a className="btn btn-danger">Delete</a>
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
