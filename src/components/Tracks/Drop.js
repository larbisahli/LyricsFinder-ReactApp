import React from "react";

const Menu = ({ Selected, value }) => {
  // _______class var_______

  const _OpItems = 'option' + (value === "Artist" ? " active top" : "");
  const _OpUsers = "option" + (value === "Track" ? " active bottom" : "");

  // _______________________

  return (
    <div className="popover_wrapper">
      <div className="popover">
        <div onClick={Selected} className={_OpItems}>
          Artist
        </div>
        <div onClick={Selected} className={_OpUsers}>
          Track
        </div>
      </div>
    </div>
  );
};

const Drop = ({ select, ShowMenu, Selected, Show }) => {
  // _______class var_______

  const _ButtonContainer =
    "button_container" +
    (select.show ? " btn_active" : Show ? " _btn_xx_active" : "");

  const _BtnArrowIcon = "btn_arrow_icon" + (select.show ? " rotate" : "");

  // ______________________

  return (
    <div data-key="btn" className="dropdown_container">
      <button className={_ButtonContainer} onClick={ShowMenu}>
        <div data-key="btn" className="button_wrapper">
          <span data-key="btn" className="btn_text">
            {select.value}
          </span>
        </div>

        <svg
          data-key="btn"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          className={_BtnArrowIcon}
        >
          <path
            fill="#2C2C2D"
            d="M10.146 7.146a.5.5 0 0 1 .708.708l-2.5 2.5a.5.5 
                        0 0 1-.708 0l-2.5-2.5a.5.5 0 1 1 .708-.708L8 9.293l2.146-2.147z"
          ></path>
        </svg>
      </button>
      {select.show && <Menu Selected={Selected} value={select.value} />}
    </div>
  );
};

export default Drop;
