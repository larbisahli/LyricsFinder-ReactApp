import React from "react";
import { Link } from "react-router-dom";

const Track = ({ track }) => {
  return (
    <div className="track_continer">
      <div className="track_wrapper">
        <h4 className="artist_name">{track.artist_name}</h4>
        <p className="card_text">
          <strong>
            <i className="fa fa-play-circle-o"></i> Track
          </strong>
          : {track.track_name}
          <br />
          <strong>
            <i className="fa fa-music"></i> Album
          </strong>
          : {track.album_name}
        </p>
        <div className="btn_container">
          <Link to={`lyrics/track/${track.track_id}`} className="V_btn">
            <i className="fa fa-eye"></i> View Lyrics
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Track;
