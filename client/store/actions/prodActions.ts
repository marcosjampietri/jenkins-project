import axios from "axios";

import { getProdActionCreator } from "../../types/shop";

import {
  Product,
  Error,
  FetchProduct,
  FetchProductRequest,
  FetchProductSuccess,
  FetchProductFailure,
  FETCH_PRODUCT,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
} from "../../types/prodTypes";

import { FETCH_PRODUCTS_SUCCESS } from "../../types/prodsTypes";

// export const fetchProductById = (id: string): FetchProduct => ({
//   type: FETCH_PRODUCT,
//   id: id,
// });

export const prodAction: getProdActionCreator<any> =
  () => async (dispatch, getState) => {
    dispatch({
      type: "LOADING",
    });

    const url =
      process.env["NODE_ENV"] === "development" ? "http://localhost:5000" : "";

    const prodUrl = () => `${url}/api/products`;
    const allProd = await axios.get(prodUrl());

    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: { products: allProd.data },
    });
  };

export const fetchProductRequest = (): FetchProductRequest => ({
  type: FETCH_PRODUCT_REQUEST,
});

export const fetchProductSuccess = (product: Product): FetchProductSuccess => ({
  type: FETCH_PRODUCT_SUCCESS,
  payload: product,
});

export const fetchProductFailure = (error: Error): FetchProductFailure => ({
  type: FETCH_PRODUCT_FAILURE,
  payload: error,
});
