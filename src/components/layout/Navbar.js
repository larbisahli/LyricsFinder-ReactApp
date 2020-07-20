import React from "react";
import "./Navbar.scss";
import Dropdown, { Item } from "./Dropdown";

const Navbar = () => {
  return (
    <nav className="navbar_container">
      <span className="navbar-brand mb-0 h1 mx-auto title_">LyricsFinder</span>
      <div className="lang_drop">
        <Dropdown
          activeItem={{
            id: "us",
            value: "UNITED STATES",
          }}
          closeOnSelect={true}
        >
          <Item id="us" value="UNITED STATES" />
          <Item id="ca" value="CANADA" />
          <Item id="de" value="GERMANY" />
          <Item id="nz" value="NEW ZEALAND" />
          <Item id="pl" value="POLAND" />
          <Item id="it" value="ITALY" />
          <Item id="es" value="SPAIN" />
          <Item id="tr" value="TURKEY" />
        </Dropdown>
      </div>
    </nav>
  );
};
export default Navbar;
