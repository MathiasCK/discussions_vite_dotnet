import { useSnapshot } from "valtio";
import { actions, state } from "../state";
import React, { useEffect } from "react";
import { DiscussionCard } from "../components/Discussions";
import { AppPage } from "../types";

const Discussions: React.FC = () => {
  const snap = useSnapshot(state);

  useEffect(() => {
    const fetcher = async () => {
      const { fetchDiscussions } = await import(
        "../services/discussions.service"
      );
      await fetchDiscussions();
    };
    fetcher();
  }, [snap.discussions]);

  return (
    <React.Fragment>
      <header className="row mb-5">
        <div className="col text-center">
          <h1 className="display-3">Discussions</h1>
          <p className="lead">Join or create a discussion</p>
          <a
            onClick={() => actions.setPage(AppPage.CreateDiscussion)}
            className="btn btn-outline-success btn-lg"
          >
            Create new discussion
          </a>
        </div>
      </header>
      <section
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        {snap.discussion &&
          snap.discussions.map(discussion => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <DiscussionCard key={discussion.id} discussion={discussion} />
          ))}
      </section>
    </React.Fragment>
  );
};

export default Discussions;
