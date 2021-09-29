import Link from "next/link";

import styled from "styled-components";
import { animated, useSpring, config } from "react-spring";

import { AppState, useTypedSelector } from "../store/reducers/rootReducer";

import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { Product } from "../types/prodTypes";
import { addToBasket, removeFromBasket } from "../store/actions/cartActions";
import { addQtyItem, minusQtyItem } from "../store/actions/cartActions";
import { prodAction } from "../store/actions/prodActions";

import {
  getProductsTotal,
  getNumberCartItems,
  getTotalPrice,
} from "../store/selectors";

interface AddToCartProps {
  product: Product;
}

export default function Home({ product }: AddToCartProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(prodAction());
  }, []);

  const { loading, data } = useSelector((state: AppState) => state.catalog);
  const prod = useSelector((state: AppState) => state.product);
  const cart = useSelector((state: AppState) => state.cart);
  const totalPrice = useSelector(getTotalPrice, shallowEqual);
  const { NavOn } = useTypedSelector((state: AppState) => state.nav);

  const numberCartItems = useSelector(getNumberCartItems, shallowEqual);

  const textSwipe = useSpring({
    config: config.slow,
    delay: 800,
    transform: NavOn ? "translate3d(100vw,0,0)" : "translate3d(100vw,0,0)",
  });

  return (
    <Page>
      <div>🤐</div>
      <Link href="/outra">
        <Text style={textSwipe}>SAY SOMETHING</Text>
      </Link>
      <Link href="/checkout">
        <Text style={textSwipe}>CHECKOUT</Text>
      </Link>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        data.map(
          (product) =>
            product && (
              <Card key={product._id}>
                <Row>
                  <h6>ITEM</h6>
                  <h4>{product.title}</h4>
                </Row>
                <Image src={product.image} />
                <Row>
                  <h6>£</h6>
                  <h4>{product.price}</h4>
                </Row>
                <button onClick={() => dispatch(minusQtyItem(product._id))}>
                  -
                </button>
                <button
                  onClick={() => {
                    dispatch(removeFromBasket(product._id));
                    console.log(prod);
                  }}
                >
                  REMOVE from BASKET
                </button>
                <button
                  onClick={() => {
                    dispatch(addToBasket(product));
                    console.log(prod);
                  }}
                >
                  ADD TO BASKET
                </button>
                <button onClick={() => dispatch(addQtyItem(product._id))}>
                  +
                </button>
              </Card>
            )
        )
      )}
      <h1>YOUR AMOUT DUE IS:</h1>
      <h1>{totalPrice}</h1>
      <h1>{numberCartItems}</h1>
    </Page>
  );
}

const Page = styled(animated.div)`
  width: 100%;
  color: hsla(327, 100%, 19%, 1);
  position: relative;
`;

const Text = styled(animated.a)`
  width: 100px;
  height: 100px;

  color: hsla(327, 100%, 19%, 1);
  cursor: pointer;
`;

const Card = styled(animated.div)`
border: solid 2px hsla(171, 100%, 50%, 1);
width: 500px;
background-image: linear-gradient(
    hsla(0, 90%, 50%, 1),
    hsla(38, 80%, 50%, 0.91)
);
input {
    width: 100%:
}
`;
const Row = styled(animated.div)`
  display: flex;
  align-items: flex-end;

  h6 {
    width: 100px;
  }
`;

const Image = styled(animated.img)`
  width: 350px;
  height: 150px;

  object-fit: cover;
`;
