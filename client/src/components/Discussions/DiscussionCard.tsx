import { AppPage, Discussion } from "../../types";

interface Props {
  discussion: Discussion;
}

const DiscussionCard: React.FC<Props> = ({ discussion }) => {
  return (
    <a
      onClick={async () => {
        if (discussion.id) {
          const { fetchDiscussion } = await import(
            "../../services/discussions.service"
          );
          const { actions } = await import("../../state");

          await fetchDiscussion(discussion.id);
          actions.setPage(AppPage.Detail);
        }
      }}
      className="btn"
    >
      <div className="card" style={{ width: "18rem", height: "18rem" }}>
        <div
          className="card-body"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <h5 className="card-title">{discussion.topic}</h5>
          <div
            style={{
              maxHeight: "150px",
              overflow: "hidden",
            }}
          >
            <p className="card-text">{discussion.body}</p>
          </div>
          <p className="card-text">
            <small className="text-muted">By {discussion.author.email}</small>
          </p>
        </div>
      </div>
    </a>
  );
};

export default DiscussionCard;
