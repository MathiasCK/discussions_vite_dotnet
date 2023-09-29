import { devtools } from "valtio/utils";
import { state } from "./state";
import React from "react";
import { Loader, Navbar, Popup } from "./components/ui";
import Pages from "./Pages";

devtools(state, { name: "app state" });
const App = () => (
  <React.Fragment>
    <Loader />
    <Navbar />
    <div className="container">
      <Popup />
      <main role="main" className="pb-3">
        <Pages />
      </main>
    </div>
  </React.Fragment>
);

export default App;
