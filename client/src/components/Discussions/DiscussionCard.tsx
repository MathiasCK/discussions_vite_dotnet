import { fetchDiscussion } from "../../services/discussions.service";
import { actions } from "../../state";
import { AppPage, Discussion } from "../../types";

interface Props {
  discussion: Discussion;
}

const DiscussionCard: React.FC<Props> = ({ discussion }) => {
  return (
    <a
      onClick={async () => {
        await fetchDiscussion(discussion.id);
        actions.setPage(AppPage.Detail);
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
          <p
            className="card-text"
            style={{
              display: "-webkit-box -webkit-box-orient vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: "3",
              height: "80%",
            }}
          >
            {discussion.body}
          </p>
          <p className="card-text">
            <small className="text-muted">By {discussion.author.email}</small>
          </p>
        </div>
      </div>
    </a>
  );
};

export default DiscussionCard;
