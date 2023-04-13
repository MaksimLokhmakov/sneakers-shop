import React from "react";
import axios from "axios";
import AppContext from "../../context";

import "./style.scss";

import closeIcon from "../../assets/images/deleteIcon.svg";

export default function SneackerCardBusket({ item, deleteFromBusket }) {
  const onDeleteFromBusket = () => {
    deleteFromBusket(item);
    axios.put(`/items/${item.id}`, { inBusket: false }).catch(() => {
      alert("error. please reload the page");
    });
  };

  return (
    <div className="busket-sneacker-card">
      <div>
        <img src={item.image} alt="sneackerIcon" width="70" height="70" />
      </div>
      <div className="busket-sneacker-card__text">
        <p>{item.info}</p>
        <span>{item.price} руб.</span>
      </div>
      <div className="icon-block" onClick={onDeleteFromBusket}>
        <img src={closeIcon} alt="deleteIcon" />
      </div>
    </div>
  );
}
