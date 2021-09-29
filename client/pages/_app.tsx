import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PersistGate } from "redux-persist/integration/react";

import { useStore } from "../store/store";
import { Provider, useSelector, useDispatch } from "react-redux";

import { Transition, animated, config } from "react-spring";
import styled from "styled-components";

import { navAction } from "../store/actions/navActions";
import { AppState } from "../store/reducers/rootReducer";

const stripePromise = loadStripe(
  "pk_test_51JP5tCEV3aJ0axV3AgECWzYOvcF1T8X4j8FRt6nYeLwwoxgfc9bvRfgATmBu6U0k1XYStmZ43soklcbdGy0LBgD300G4pdBwfD"
);

function AppChild({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const items = [
    {
      id: router.route,
      Component,
      pageProps,
    },
  ];

  const { NavOn } = useSelector((state: AppState) => state.nav);
  {
    /* const { ModOn, ModComponent } = useSelector((state: AppState) => state.mod); */
  }

  useEffect(() => {
    if (NavOn) {
      dispatch(navAction());
    }
  }, [router.route]);

  return (
    <>
      <NextChild>
        <StyledDiv>
          <Transition
            items={items}
            keys={(item: any) => item.id}
            config={config.slow}
            from={{
              opacity: 1,
              transform: "translate3d(80vw,0,0)  rotateY(60deg) ",
              transformOrigin: "top right",
            }}
            initial={{ opacity: 0 }}
            enter={{
              opacity: 1,
              transform: "translate3d(0vw,0,0) rotateY(0deg)   ",
              transformOrigin: "top right",
            }}
            leave={{
              opacity: 0,
              position: "absolute",
              transform: "translate3d(0vw,0,0) rotateY(0deg)  ",
              transformOrigin: "top right",
            }}
          >
            {(
              styles,
              { pageProps: animatedPageProps, Component: AnimatedComponent },
              key: string
            ) => (
              <animated.div
                key={key}
                style={{
                  ...styles,
                  width: "100%",
                  height: "100%",
                }}
              >
                <AnimatedComponent {...animatedPageProps} />
              </animated.div>
            )}
          </Transition>
        </StyledDiv>
      </NextChild>
    </>
  );
}

function App({ Component, pageProps, router }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Elements stripe={stripePromise}>
      <Provider store={store}>
        <PersistGate persistor={store.__PERSISTOR} loading={null}>
          <AppChild
            Component={Component}
            pageProps={pageProps}
            router={router}
          />
        </PersistGate>
      </Provider>
    </Elements>
  );
}
export default App;

const NextChild = styled.div`
  width: 100vw;
  height: 100%;
`;

const StyledDiv = styled.div`
  perspective: 40em;
  perspective-origin: top;
  width: 100vw;
  height: 100%;
  overflow: hidden;
`;
