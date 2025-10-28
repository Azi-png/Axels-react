import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularProducts from "./PopularProducts";
import NewProducts from "./NewProducts";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewProducts, setPopularProducts, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../sevices/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import "../../../css/home.css";
import { Member } from "../../../lib/types/member";
import MemberService from "../../sevices/MemberService";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularProducts: (data: Product[]) => dispatch(setPopularProducts(data)),
  setNewProducts: (data: Product[]) => dispatch(setNewProducts(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
  const { setPopularProducts, setNewProducts, setTopUsers } = actionDispatch(
    //2.keyin actionDispatch f call qilinadi, u objectni qaytaradi objectni ichida 3 ta funksiya bb, ularni useEffectni ichida foydalanish un destruct qilyamiz.
    useDispatch() //birinchi useDispatch ishga tushadi, reduxdan dispatch funksiyasini qaytaradi. 20-qatordagi.
  );

  useEffect(() => {
    // Backend server data fetch => Data
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCollection: ProductCollection.RING,
      })
      .then((data) => {
        setPopularProducts(data.products); //3-qadamda shu qator ishga tushadi.
      })
      .catch((err) => console.log(err));

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        // productCollection: ProductCollection.DISH,
      })
      .then((data) => {
        setNewProducts(data.products);
      })
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => setTopUsers(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="homepage">
      <Statistics />
      <PopularProducts />
      <NewProducts />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
