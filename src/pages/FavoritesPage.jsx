import React from "react";
import { Link } from "react-router-dom";

import { SneackerBlock, Button } from "../components";

import smileOne from "../assets/images/image 9.jpg";
import arrowBack from "../assets/images/Vector 217.svg";

const Favorites = ({
  goodsInFavorite,
  addToBusket,
  deleteFromBusket,
  deleteFromFavorite,
}) => {
  return (
    <div className="content">
      {goodsInFavorite && goodsInFavorite.length > 0 && (
        <div
          className="content-header"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            marginBottom: "40px",
          }}
        >
          <Link to="/">
            <div
              className="icon-block"
              style={{ position: "relative", marginRight: "10px" }}
            >
              <img src={arrowBack} alt="arrowBack" />
            </div>
          </Link>
          <h1>Мои закладки</h1>
        </div>
      )}

      <div className="content__goods">
        {goodsInFavorite && goodsInFavorite.length > 0 ? (
          goodsInFavorite.map((item) => {
            return (
              <SneackerBlock
                key={item.id}
                item={item}
                onAddToBusket={addToBusket}
                onDeleteFromFavorite={deleteFromFavorite}
                onDeleteFromBusket={deleteFromBusket}
              />
            );
          })
        ) : (
          <div className="content__goods-empty">
            <img src={smileOne} alt="smile" />
            <h3>Закладок нет :(</h3>
            <p>Вы ничего не добавляли в закладки</p>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button value="Вернуться назад" backOrFor={false}></Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
