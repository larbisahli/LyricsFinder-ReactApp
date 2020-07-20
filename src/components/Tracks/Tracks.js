import React, { useState, useContext, Fragment } from "react";
import { TrackContext } from "../../context";
import Loader from "../layout/Loader";
import Track from "./Track";
import "./tracks.scss";

const Tracks = () => {
  const { trackList, heading, isLoading } = useContext(TrackContext);

  return (
    <div className="index_container">
      {isLoading ? (
        <Fragment>
          <h3 className="title">{heading}</h3>
          <div className="tracks_container">
            {trackList.map((item) => {
              return <Track key={item.track.track_id} track={item.track} />;
            })}
          </div>
        </Fragment>
      ) : (
        <div className="title">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Tracks;
