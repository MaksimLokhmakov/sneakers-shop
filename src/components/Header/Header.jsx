import React from "react";
import { Link } from "react-router-dom";

// ? иконки
import Logo from "../../assets/images/Logo.svg";
import Busket from "../../assets/images/Busket.svg";
import Like from "../../assets/images/Like.svg";
import UserAccount from "../../assets/images/UserAccount.svg";

import "./style.scss";

const Header = ({ setVisibleDrawer, totalAmount }) => {
  const banPageScroll = () => {
    const body = document.querySelector("body");
    body.classList.add("stop-scrolling");
    console.log(body);
  };

  return (
    <header>
      <div className="header__left">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
        <div className="header__left-text">
          <h3>REACT SNEAKERS</h3>
          <p>Магазин лучших кроссовок</p>
        </div>
      </div>
      <ul className="header__right">
        <li>
          <div>
            <img
              src={Busket}
              alt="Busket"
              onClick={() => {
                banPageScroll();
                setVisibleDrawer(true);
              }}
            />
            <p>{totalAmount} руб.</p>
          </div>
        </li>
        <li>
          <Link to="/favorites">
            <img src={Like} alt="Like" />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img src={UserAccount} alt="UserAccount" />
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
