import React, { useState, useContext, Fragment } from "react";
import axios from "axios";
import { TrackContext } from "../../context";
import "./Search.scss";
import Load from "./Load";
import Drop from "./Drop";

const Search = () => {
  const [trackTitle, setTrackTitle] = useState({ trackTitle: "" });

  const { setTrackList, setHeading } = useContext(TrackContext);

  const [isLoading, setIsLoading] = useState(false);

  const [highLight, setHighLight] = useState(false);

  const [select, setSelect] = useState("Artist");

  const [filterSelect, setFilterSelect] = useState("q_artist");

  const [showMenu, setShowMenu] = useState(false);

  const ShowMenu = event => {
    event.preventDefault();

    setShowMenu(!showMenu, document.addEventListener("click", CloseMenu));
    const data = event.target.getAttribute("data-key");

    if (data === "btn" && showMenu) {
      document.removeEventListener("click", CloseMenu);
    }
  };

  const CloseMenu = () => {
    setShowMenu(false, document.removeEventListener("click", CloseMenu));
  };

  const Selected = event => {
    const value = event.target.textContent;

    if (value === "Artist") {
      setFilterSelect("q_artist");
    } else {
      setFilterSelect("q_track");
    }
    setSelect(value);
  };

  const HundleChange = e => {
    setTrackTitle({ [e.target.name]: e.target.value });
  };

  const HundleFocus = () => {
    setHighLight(true);
  };

  const HandleOnBlur = () => {
    setHighLight(false);
  };

  const HundlekeyPress = event => {
    if (event.key === "Enter") {
      HandleSubmit(event);
    }
  };

  const HandleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .get(
        `http://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?${filterSelect}=${trackTitle.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(respond => {
        setTrackList(
          [...respond.data.message.body.track_list],
          setIsLoading(false),
          setHeading("Search Results")
        );
      })
      .catch(err => console.log("err", err));
  };

  const _Divider = "divider" + (highLight ? " _D_active" : "");
  const FormContainer = "form_container" + (highLight ? " active" : "");
  const Loader = "Loader" + (highLight ? " Loader-fff" : "");

  return (
    <Fragment>
      {
        <div className="search_container">
          <h1 className="search_title">
            <i className="fa fa-music"></i> Search For A Song
          </h1>
          <p className="para">Get the lyrics for any song</p>
          <form className={FormContainer} onSubmit={HandleSubmit}>
            <Drop
              select={{ value: select, show: showMenu }}
              CloseMenu={CloseMenu}
              ShowMenu={ShowMenu}
              Selected={Selected}
              Show={highLight}
            />
            <div className={_Divider}></div>
            <input
              type="search"
              className="form_control"
              name="trackTitle"
              placeholder="Song title..."
              onKeyPress={HundlekeyPress}
              onChange={HundleChange}
              value={trackTitle.trackTitle}
              onFocus={HundleFocus}
              onBlur={HandleOnBlur}
            />
            <div className={Loader}>{isLoading ? <Load /> : ""}</div>
            <div className="search_btn">
              <button className="s_btn">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </form>
        </div>
      }
    </Fragment>
  );
};

export default Search;
