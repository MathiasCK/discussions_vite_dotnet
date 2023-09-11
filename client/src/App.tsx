import { devtools } from "valtio/utils";
import { state } from "./state";
import { useSnapshot } from "valtio";
import React from "react";
import { Loader, Navbar, Popup } from "./components/ui";
import Pages from "./Pages";

devtools(state, { name: "app state" });
const App = () => {
  const snap = useSnapshot(state);

  return (
    <React.Fragment>
      <Loader isLoading={snap.isLoading} color="orange" width={120} />
      <Navbar />
      <Popup />
      <div className="container">
        <main role="main" className="pb-3">
          <Pages />
        </main>
      </div>
    </React.Fragment>
  );
};

export default App;
