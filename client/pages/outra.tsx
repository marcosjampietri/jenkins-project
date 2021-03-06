import Link from "next/link";

import styled from "styled-components";
import { animated, useSpring, config } from "react-spring";

import { AppState, useTypedSelector } from "../store/reducers/rootReducer";

export default function Outra() {
    const { NavOn } = useTypedSelector((state: AppState) => state.nav);

    const textSwipe = useSpring({
        config: config.slow,
        delay: 800,
        transform: NavOn ? "translate3d(100vw,0,0)" : "translate3d(100vw,0,0)",
    });

    return (
        <Page>
            <div>🥳</div>
            <div>IM RUNNING FROM A FULL DEVOPS PROCESS YAYYYY!!!</div>
            <Link href="/">
                <Text style={textSwipe}>SHUT UP!!</Text>
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
