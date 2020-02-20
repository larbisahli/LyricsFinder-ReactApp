import React, { useState, useContext, useEffect, useRef } from "react";
import "./dropdown.scss";
import { TrackContext } from "../../context";

export const Item = ({
  addItem,
  id,
  value,
  index,
  activeItem,
  TotalItems,
  showMenu,
  HundleClick
}) => {
  useEffect(() => {
    addItem({
      id: id,
      item: value
    });
  }, []);

  const Myclass = () => {
    let active;
    if (index === 0) {
      active = "op_top" + (activeItem.id === id ? " active_top_radius" : "");
    } else if (index < TotalItems - 1) {
      active = "op_mid" + (activeItem.id === id ? " active_no_radius" : "");
    } else {
      active =
        "op_bottom" + (activeItem.id === id ? " active_bottom_radius" : "");
    }
    return active;
  };

  return (
    showMenu && (
      <div
        data-id={index + 1}
        onClick={() =>
          HundleClick({
            id: id,
            value: value
          })
        }
        className={Myclass()}
      >
        {value}
      </div>
    )
  );
};

const Dropdown = props => {
  const { hundleCountry } = useContext(TrackContext);

  const [activeItem, setActiveItem] = useState(props.activeItem);

  const [items, setItems] = useState({ items: [] });

  const [showMenu, setShowMenu] = useState(false);

  const addItem = newItem => {
    let isNewitemFound;
    for (let i in items.items) {
      let item = items.items[i];

      if (item.id === newItem.id) {
        isNewitemFound = true;
        break;
      }
    }

    if (!isNewitemFound) {
      setItems(prevState => {
        return {
          items: prevState.items.concat(newItem)
        };
      });
    }
  };

  const handelShowMenu = event => {
    event.preventDefault();

    setShowMenu(!showMenu, document.addEventListener("click", closeMenu));
  };

  const closeMenu = event => {
    const data = event.target.getAttribute("data-id");

    if (!(typeof data === "string" && !props.closeOnSelect))
      setShowMenu(false, document.removeEventListener("click", closeMenu));
  };

  const Choose = item => {
    setActiveItem(item, hundleCountry(item));
  };

  const TotalItems = props.children.length;
  const _Btn = "btn" + (showMenu ? " btn_active_" : "");
  const _BtnArrowIcon = "btn_arrow_icon" + (showMenu ? " rotate" : "");

  return (
    <div className="btn_wrapper">
      <button className={_Btn} onClick={handelShowMenu}>
        <div className="text">
          <span>{activeItem.value}</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="3 3 10 10"
          className={_BtnArrowIcon}
        >
          <path
            fill="#fff"
            d="M10.146 7.146a.5.5 0 0 1 .708.708l-2.5 2.5a.5.5 
                        0 0 1-.708 0l-2.5-2.5a.5.5 0 1 1 .708-.708L8 9.293l2.146-2.147z"
          ></path>
        </svg>
      </button>
      <div data-id="0" className="dropdown">
        {React.Children.map(props.children, (child, index) =>
          React.cloneElement(child, {
            activeItem: activeItem,
            addItem: addItem,
            HundleClick: Choose,
            index: index,
            TotalItems: TotalItems,
            showMenu: showMenu
          })
        )}
      </div>
    </div>
  );
};

export default Dropdown;
