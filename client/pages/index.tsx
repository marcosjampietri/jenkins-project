import Link from "next/link";
import { useSelector } from "react-redux";

import styled from "styled-components";
import { animated, useSpring, config } from "react-spring";

import { AppState } from "./_app";

export default function Home() {
  const { NavOn } = useSelector((state: AppState) => state.nav);

  const textSwipe = useSpring({
    config: config.slow,
    delay: 800,
    transform: NavOn ? "translate3d(100vw,0,0)" : "translate3d(100vw,0,0)",
  });

  return (
    <Page>
      <div>Rélou Taips quíprit</div>
      <Link href="/outra">
        <Text style={textSwipe}>OUTRA</Text>
      </Link>
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
