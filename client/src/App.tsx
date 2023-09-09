import { devtools } from "valtio/utils";
import { actions, state } from "./state";
import { useSnapshot } from "valtio";
import React, { useEffect } from "react";
import { Loader } from "./components/ui";
import Pages from "./Pages";

devtools(state, { name: "app state" });
const App = () => {
  const snap = useSnapshot(state);

  useEffect(() => {
    actions.startLoading();
    setTimeout(() => {
      actions.stopLoading();
    }, 2000);
  }, []);

  return (
    <React.Fragment>
      <Loader isLoading={snap.isLoading} color="orange" width={120} />
      <Pages />
    </React.Fragment>
  );
};

export default App;
