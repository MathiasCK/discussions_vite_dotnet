import React from "react";
import { actions } from "../state";
import { AppPage } from "../types";
import {
  DiscussionComments,
  DiscussionDetails,
} from "../components/Discussions";

const Detail: React.FC = () => {
  return (
    <React.Fragment>
      <header className="mb-2">
        <a
          onClick={() => actions.setPage(AppPage.Discussions)}
          className="btn btn-primary"
        >
          Back to Discussions
        </a>
      </header>

      <DiscussionDetails />
      <DiscussionComments />
    </React.Fragment>
  );
};

export default Detail;
