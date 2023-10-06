import { devtools } from "valtio/utils";
import { state } from "./state";
import React from "react";
import { Loader, Navbar } from "./components/ui";
import Pages from "./Pages";
import { Toaster } from "react-hot-toast";

devtools(state, { name: "app state" });
const App = () => (
  <React.Fragment>
    <Loader />
    <Navbar />
    <div className="container">
      <main role="main" className="pb-3">
        <Toaster />
        <Pages />
      </main>
    </div>
  </React.Fragment>
);

export default App;
