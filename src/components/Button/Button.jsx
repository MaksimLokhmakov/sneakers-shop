import React from "react";
import classNames from "classnames";

import "./style.scss";

import arrowIcon from "../../assets/images/Arrow.svg";
import arrowIconBack from "../../assets/images/arrowBack.svg";

export default function Button({ value, backOrFor, width, onClick }) {
  return (
    <div>
      <button
        className={classNames(
          backOrFor ? `button-for` : `button-back`,
          `button`
        )}
        width="245"
        height="20px"
        onClick={onClick ? () => onClick(false) : () => {}}
      >
        {value}
        <img
          className={classNames(backOrFor ? `arrowIcon` : `arrowIconBack`)}
          src={backOrFor ? arrowIcon : arrowIconBack}
          alt="nextPage"
          width="22"
          height="22"
        />
      </button>
    </div>
  );
}
