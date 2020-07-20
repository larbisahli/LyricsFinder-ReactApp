import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Loader from "../layout/Loader";
import Moment from "react-moment";
import "./Lyrics.scss";

const Lyrics = () => {
  const [{ track }, setTrack] = useState({ track: "" });
  const [lyrics, setLyrics] = useState({ lyrics: "" });
  const [isLoading, setIsLoading] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    setIsLoading(false);
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((respond) => {
        setLyrics({ lyrics: respond.data.message.body.lyrics });

        return axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${id}&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })
      .then((respond) => {
        // this is for the second api call
        setTrack(
          { track: respond.data.message.body.track },
          setIsLoading(true)
        );
      })
      .catch((err) => console.log("err", err));
  }, []);

  const _catch_genre = (data) => {
    // music_genre sometimes is empty
    if (data.lenght > 0) {
      return data[0].music_genre.music_genre_name;
    } else {
      return "Music";
    }
  };

  const _catch_lyrics = (lyrics) => {
    try {
      return lyrics.lyrics_body;
    } catch {
      return (
        <>
          <i className="fa fa-binoculars"></i> Oh No i think we need to pay for
          more lyrics -(-_-)-
        </>
      );
    }
  };

  return (
    <div className="index_container _container">
      {isLoading ? (
        <div className="lyrics_container">
          <Link to="/" className="back_btn">
            <i className="fa fa-arrow-circle-left"></i> Go Back
          </Link>
          <Fragment>
            <div className="card">
              <h4 className="card_head">
                {track.track_name} by{" "}
                <span className="span_text">{track.artist_name}</span>
              </h4>
              <div className="card_body">
                <pre className="card_lyrics">
                  {_catch_lyrics(lyrics.lyrics)}
                </pre>
              </div>
            </div>
            <div className="sider">
              <ul className="list_container">
                <li className="list_items">
                  <strong>Album ID</strong>: {track.album_id}
                </li>
                <li className="list_items">
                  <strong>Song Genre</strong>:{" "}
                  {track && _catch_genre(track.primary_genres.music_genre_list)}
                </li>
                <li className="list_items">
                  <strong>Explicit Words</strong>:{" "}
                  {track.explicit === 0 ? "No" : "Yes"}
                </li>
                <li className="list_items">
                  <strong>Release Date</strong>:{" "}
                  <Moment format="MM/DD/YYYY">{track.updated_time}</Moment>
                </li>
              </ul>
            </div>
          </Fragment>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Lyrics;
