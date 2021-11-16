import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import home from "./home";
import details from "./details";
import loading from "./loading";
import booksell from "./sach-ban-chay";
import categorys from "./categorys";
import user from "./user";
import authors from "./author";
import search from "./search";
import allbooks from "./books";
import address from "./address";
import orders from "./order";
import raiting from "./raiting";
import shipper from "./ship";

const reducer = combineReducers({
  home,
  details,
  loading,
  booksell,
  categorys,
  authors,
  user,
  search,
  allbooks,
  address,
  orders,
  raiting,
  shipper,
});

const store = configureStore({
  reducer,
});

export default store;
