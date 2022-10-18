import React from "react";
import Main from "./sites/main.js/main";
import Product from "./sites/product/product";
import Cart from "./sites/cart/cart";
import { Routes, Route } from "react-router-dom";

export default class App extends React.Component {
  render() {
    return (
          <Routes>
            <Route path="/" element={
              <Main />
            }/>
            <Route path="/product/:id" element={
              <Product />
            }/>
            <Route path="/cart" element={
              <Cart />
            }/>
          </Routes>
      
    );
  }
}