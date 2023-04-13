import React from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import AppContext from "./context";

// ? компоненты
import { Header, Drawer } from "./components";
import { HomePage, FavoritesPage, UserOrdersPage } from "./pages";

import "./scss/style.scss";

const App = () => {
  axios.defaults.baseURL = "https://61631742c48338001730081b.mockapi.io";

  const [goods, setGoods] = React.useState(null);
  const [visibleDrawer, setVisibleDrawer] = React.useState();
  const [goodsInBusket, setGoodsInBusket] = React.useState();
  const [goodsInFavorite, setGoodsInFavorite] = React.useState();
  const [orders, serOrders] = React.useState();
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get("/items")
      .then(({ data }) => {
        let newTotalAmount = 0;
        const newGoodsInBusket = data.filter((item) => {
          if (item.inBusket) {
            let price = item.price.split(" ").join("");
            newTotalAmount = newTotalAmount + Number(price);
            return item;
          }
        });
        const newGoodsInFavorite = data.filter((item) => item.inFavorite);
        setGoods(data);
        setTotalAmount(newTotalAmount);
        setGoodsInBusket(newGoodsInBusket);
        setGoodsInFavorite(newGoodsInFavorite);
        setIsLoading(false);
      })
      .catch(() => alert("error"));

    axios
      .get("/orders")
      .then(({ data }) => {
        console.log("orders: ", data);
        serOrders(data);
      })
      .catch(() => alert("error"));
  }, []);

  const goodsInBuscketToOrders = () => {
    goodsInBusket.forEach((item) => {
      axios.put(`/items/${item.id}`, { inBusket: false }).then(({ data }) => {
        data.inFavorite = false;
        axios.post("/orders", data);
        serOrders((prev) => [...prev, data]);
      });
    });
  };

  const addPageScroll = () => {
    const body = document.querySelector("body");
    body.classList.remove("stop-scrolling");
  };

  const checkAddedItem = (id) => {
    for (let i = 0; i < goodsInBusket.length; i++)
      if (goodsInBusket[i].id === id) return false;

    return true;
  };

  const addToBusket = (data) => {
    data.inBusket = true;
    if (checkAddedItem(data.id)) {
      const price = data.price.split(" ").join("");
      const newTotalAmount = totalAmount + Number(price);
      const newGoodsInBusket = [...goodsInBusket, data];

      setTotalAmount(newTotalAmount);
      setGoodsInBusket(newGoodsInBusket);
    }
  };

  const deleteFromBusket = (data) => {
    data.inBusket = false;
    const newGoodsInBusket = goodsInBusket.filter(
      (item) => item.id !== data.id
    );
    const price = data.price.split(" ").join("");
    const newTotalAmount = totalAmount - Number(price);
    setTotalAmount(newTotalAmount);
    setGoodsInBusket(newGoodsInBusket);
  };

  const addToFavorite = (data) => {
    data.inFavorite = true;
    setGoodsInFavorite((prev) => [...prev, data]);
  };

  const deleteFromFavorite = (data) => {
    data.inFavorite = false;
    setGoodsInFavorite((prev) => prev.filter((item) => item.id !== data.id));
  };

  return (
    <>
      <CSSTransition
        in={visibleDrawer}
        timeout={300}
        classNames="drawer"
        unmountOnExit
      >
        <Drawer
          setVisibleDrawer={setVisibleDrawer}
          goods={goodsInBusket}
          totalAmount={totalAmount}
          deleteFromBusket={deleteFromBusket}
          addPageScroll={addPageScroll}
          setGoodsInBusket={setGoodsInBusket}
          setTotalAmount={setTotalAmount}
          goodsInBuscketToOrders={goodsInBuscketToOrders}
        />
      </CSSTransition>
      <div className="Block">
        <Header setVisibleDrawer={setVisibleDrawer} totalAmount={totalAmount} />
        <Route path="/" exact>
          <HomePage
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            goods={goods}
            addToBusket={addToBusket}
            deleteFromBusket={deleteFromBusket}
            addToFavorite={addToFavorite}
            deleteFromFavorite={deleteFromFavorite}
            isLoading={isLoading}
          />
        </Route>
        <Route path="/favorites">
          <FavoritesPage
            goodsInFavorite={goodsInFavorite}
            addToBusket={addToBusket}
            deleteFromBusket={deleteFromBusket}
            deleteFromFavorite={deleteFromFavorite}
          />
        </Route>
        <Route path="/orders">
          <UserOrdersPage
            orders={orders}
            addToBusket={addToBusket}
            deleteFromBusket={deleteFromBusket}
            deleteFromFavorite={deleteFromFavorite}
          />
        </Route>
      </div>
    </>
  );
};

export default App;
