import React from "react";
import classes from "./Loader.module.css";
import { useSnapshot } from "valtio";
import { state } from "../../../state";

const Loader: React.FC = () => {
  const { isLoading } = useSnapshot(state);

  return isLoading ? (
    <section className={classes.overlay}>
      <div className={classes.container} />
    </section>
  ) : null;
};

export default Loader;
