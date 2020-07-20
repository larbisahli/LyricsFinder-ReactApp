import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const TrackContext = createContext();

export const ListProvider = (props) => {
  const [trackList, setTrackList] = useState([]);
  const [country, setCountry] = useState({ id: "ca", value: "UNITED STATES" });
  const [isLoading, setIsLoading] = useState(false);

  const [heading, setHeading] = useState(`Top 10 Tracks in ${country.value}`);

  const hundleCountry = (e) => {
    setCountry(e);
    setHeading(`Top 10 Tracks in ${e.value}`);
  };

  useEffect(() => {
    setIsLoading(false);
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=${country.id}&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((respond) => {
        setTrackList(
          [...respond.data.message.body.track_list],
          setIsLoading(true)
        );
      })
      .catch((err) => console.log("err", err));
  }, [country]);

  return (
    <TrackContext.Provider
      value={{
        trackList,
        heading,
        hundleCountry,
        isLoading,
        setTrackList,
        setHeading,
      }}
    >
      {props.children}
    </TrackContext.Provider>
  );
};
