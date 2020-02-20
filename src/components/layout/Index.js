import React, { Fragment } from "react";
import Tracks from "../Tracks/Tracks";
import Search from "../Tracks/Search";
const Index = () => {
  return (
    <Fragment>
      <Search />
      <Tracks />
    </Fragment>
  );
};

export default Index;
