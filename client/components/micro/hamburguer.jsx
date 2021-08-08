import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { animated, useSpring } from "react-spring";

import styled from "styled-components";
import { navAction } from "../../store/actions/navActions";

const Burger = () => {
  const dispatch = useDispatch();
  //access rootReducer
  const { NavOn } = useSelector((state) => state.nav);

  //dispatch buttons
  const toggleNav = () => {
    dispatch(navAction());
  };

  useEffect(() => {
    if (NavOn) {
      dispatch(navAction());
    }
  }, [dispatch]);

  const first = useSpring({
    position: "absolute",
    transform: NavOn
      ? "translate(12px, 35px) rotate(-45deg)"
      : "translate(10px, 8px) rotate(0deg)",
  });
  const second = useSpring({
    position: "absolute",
    transform: NavOn
      ? "translate(17px, 7px) rotate(45deg)"
      : "translate(10px, 20px) rotate(0deg)",
  });
  const third = useSpring({
    position: "absolute",
    transform: NavOn
      ? "translate(12px, 35px) rotate(-45deg)"
      : "translate(10px, 32px) rotate(0deg)",
  });
  const bg = useSpring({
    backgroundColor: NavOn
      ? "hsla(350, 0%, 90%, 0.7)"
      : "hsla(350, 0%, 90%, 0.05)",
  });

  return (
    <Box onClick={toggleNav} style={bg}>
      <Lines xmlns="http://www.w3.org/2000/svg">
        <animated.rect width="40" height="4" rx="2" style={first} />
        <animated.rect width="40" height="4" rx="2" style={second} />
        <animated.rect width="40" height="4" rx="2" style={third} />
      </Lines>
    </Box>
  );
};

export default Burger;

const Box = styled(animated.div)`
  position: relative;
  width: 60px;
  height: 45px;

  border: 1px inset hsla(350, 80%, 50%, 1);
  cursor: pointer;

  :hover {
    border: 1px inset hsla(350, 80%, 70%, 1);
    svg {
      transition: 0.01s;
      fill: hsla(350, 80%, 80%, 1);
    }
  }
`;
const Lines = styled.svg`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;

  transition: 0.8s;
  fill: hsla(350, 80%, 50%, 1);

  // viewbox: 0 0 44 44;
`;
