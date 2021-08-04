import Head from "next/head";
import Image from "next/image";

import styled from "styled-components";
import { animated } from "react-spring";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Page>
      <div>Rélou Taips quíprit</div>
    </Page>
  );
}

const Page = styled(animated.div)`
  width: 100%;
  color: hsla(327, 100%, 19%, 1);
`;
