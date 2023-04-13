import React from "react";

import "./style.scss";

import bucketImg from "../../assets/images/busket.png";
import orderDoneImg from "../../assets/images/orderDone.jpg";

import { SneackerCardBusket, Button } from "..";

export default function Drawer({
  setVisibleDrawer,
  goods,
  totalAmount,
  deleteFromBusket,
  addPageScroll,
  setGoodsInBusket,
  setTotalAmount,
  goodsInBuscketToOrders,
}) {
  const [orderDone, setOrderDone] = React.useState(false);

  const deleteGoodsInBuscket = () => {
    setGoodsInBusket([]);
    setTotalAmount(0);
  };

  console.log("goods: ", goods);

  return (
    <div>
      <div className="drawer">
        {orderDone ? (
          <div className="unactiveDrawer">
            <img src={orderDoneImg} alt="orderDoneImg" />
            <h3>Заказ оформлен!</h3>
            <p>Ваш заказ #18 скоро будет передан курьерской доставке</p>
            <Button
              value="Вернуться назад"
              backOrFor={false}
              width="245px"
              onClick={() => {
                addPageScroll();
                setVisibleDrawer(false);
              }}
            />
          </div>
        ) : goods.length !== 0 ? (
          <div className="activeDrower">
            <div>
              <h2>Корзина</h2>
              <div className="drawer__content">
                {goods.map((item) => {
                  return (
                    <SneackerCardBusket
                      deleteFromBusket={deleteFromBusket}
                      key={item.id}
                      item={item}
                    />
                  );
                })}
              </div>
            </div>
            <div className="activeDrower__footer">
              <div className="footer-text">
                Итого:
                <div></div>
                <span>{totalAmount} руб. </span>
              </div>
              <div className="footer-text">
                Налог 5%:
                <div></div>
                <span>{(totalAmount * 0.05).toFixed(0)} руб. </span>
              </div>
              <Button
                value="Оформить заказ"
                backOrFor
                onClick={() => {
                  setOrderDone(true);
                  deleteGoodsInBuscket();
                  goodsInBuscketToOrders();
                }}
              />
            </div>
          </div>
        ) : (
          <div className="unactiveDrawer">
            <img src={bucketImg} alt="busketImg" />
            <h3>Корзина пустая</h3>
            <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
            <Button
              value="Вернуться назад"
              backOrFor={false}
              width="245px"
              onClick={() => {
                addPageScroll();
                setVisibleDrawer(false);
              }}
            />
          </div>
        )}
      </div>
      <div
        className="overlay"
        onClick={() => {
          addPageScroll();
          setVisibleDrawer(false);
        }}
      ></div>
    </div>
  );
}
