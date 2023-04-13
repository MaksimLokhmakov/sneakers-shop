import React from "react";

import searchIcon from "../assets/images/searchButton.svg";
import closeIcon from "../assets/images/deleteIcon.svg";

import { SneackerBlock } from "../components";

import sliderImg from "../assets/images/sliderImg.png";
import sliderInfoImg from "../assets/images/sliderInfoImg.png";
import arrowFor from "../assets/images/arrowFor.png";

const HomePage = ({
  searchValue,
  setSearchValue,
  goods,
  addToBusket,
  deleteFromBusket,
  addToFavorite,
  deleteFromFavorite,
  isLoading,
}) => {
  const [addedBusket, setAddedBusket] = React.useState();

  const renderGoods = () => {
    const filteredGoods =
      goods &&
      goods.filter((item) =>
        item.info.toLowerCase().includes(searchValue.toLowerCase())
      );
    return (isLoading ? [...Array(12)] : filteredGoods).map((item, index) => {
      return (
        <SneackerBlock
          key={index}
          item={item}
          onAddToBusket={addToBusket}
          onAddToFavorite={addToFavorite}
          onDeleteFromFavorite={deleteFromFavorite}
          onDeleteFromBusket={deleteFromBusket}
          isLoading={isLoading}
          addedBusket={addedBusket}
          setAddedBusket={setAddedBusket}
        />
      );
    });
  };

  return (
    <>
      <div className="content">
        <div className="content__slider">
          <button className="content__slider-button">
            <img src={arrowFor} alt="arrowFor" />
          </button>
          <div className="content__slider-info">
            <img src={sliderInfoImg} alt="sliderInfoImg" />
            <div className="content__slider-info-content">
              <span>
                Stan Smith <span style={{ color: "#000" }}>, Forever!</span>
              </span>
              <button>Купить</button>
            </div>
          </div>
          <img src={sliderImg} alt="sliderImg" />
        </div>
        <div className="content__header">
          <h1>
            {!searchValue
              ? "Все кроссовки"
              : `Поиск по запросу: "${searchValue}"`}
          </h1>

          <div className="content__header-search">
            <img className="search-img" src={searchIcon} alt="searchIcon" />
            <input
              onChange={(event) => setSearchValue(event.target.value)}
              value={searchValue}
              placeholder="Поиск..."
              maxLength="9"
            ></input>

            {searchValue && (
              <div className="icon-block" onClick={() => setSearchValue("")}>
                <img src={closeIcon} alt="deleteIcon" />
              </div>
            )}
          </div>
        </div>

        <div className="content__goods">{renderGoods()}</div>
      </div>
    </>
  );
};

export default HomePage;
