import { useEffect, useState } from "react";

import styled from "styled-components";
import { useSpring, animated, config } from "react-spring";
import { Waypoint } from "react-waypoint";

export const Reveal = ({ children }) => {
    const [show, setShow] = useState(false);

    const reveal = useSpring({
        opacity: show ? 1 : 0,
        y: show ? 0 : 100,
        config: config.molasses,
    });
    return (
        <Waypoint
            bottomOffset="30%"
            onEnter={() => {
                if (!show) setShow(true);
            }}>
            <animated.div style={reveal}>{children}</animated.div>
        </Waypoint>
    );
};

export const RevealR = ({ children }) => {
    const [show, setShow] = useState(false);

    const reveal = useSpring({
        opacity: show ? 1 : 0,
        x: show ? 0 : 100,
        config: config.molasses,
    });
    return (
        <Waypoint
            bottomOffset="30%"
            onEnter={() => {
                if (!show) setShow(true);
            }}>
            <animated.div style={reveal}>{children}</animated.div>
        </Waypoint>
    );
};
export const RevealL = ({ children }) => {
    const [show, setShow] = useState(false);

    const reveal = useSpring({
        opacity: show ? 1 : 0,
        x: show ? 0 : -100,
        config: config.molasses,
    });
    return (
        <Waypoint
            bottomOffset="30%"
            onEnter={() => {
                if (!show) setShow(true);
            }}>
            <animated.div style={reveal}>{children}</animated.div>
        </Waypoint>
    );
};
export const PageR = ({ children }) => {
    const [show, setShow] = useState(false);

    const reveal = useSpring({
        opacity: show ? 1 : 0,
        transform: show
            ? "translate3d(0vw,0,0) rotateY(0deg)"
            : "translate3d(100vw,0,0) rotateY(60deg)",
        transformStyle: "preserve-3d",
        config: config.molasses,
    });
    return (
        <Waypoint
            bottomOffset="30%"
            onEnter={() => {
                if (!show) setShow(true);
            }}>
            <PageParent>
                <animated.div style={reveal}>{children}</animated.div>
            </PageParent>
        </Waypoint>
    );
};

export const PageL = ({ children }) => {
    const [show, setShow] = useState(false);

    const reveal = useSpring({
        opacity: show ? 1 : 0,
        transform: show
            ? "translate3d(0vw,0,0) rotateY(0deg)"
            : "translate3d(-100vw,0,0) rotateY(-60deg)",
        transformStyle: "preserve-3d",
        config: config.molasses,
    });
    return (
        <Waypoint
            bottomOffset="30%"
            onEnter={() => {
                if (!show) setShow(true);
            }}>
            <PageParent>
                <animated.div style={reveal}>{children}</animated.div>
            </PageParent>
        </Waypoint>
    );
};

export const PageU = ({ children }) => {
    const [show, setShow] = useState(false);

    const reveal = useSpring({
        opacity: show ? 1 : 0,
        transform: show
            ? "translate3d(0,0vh,0) rotateX(0deg)"
            : "translate3d(0,0vh,0) rotateX(-90deg)",
        transformStyle: "preserve-3d",
        config: config.molasses,
    });
    return (
        <Waypoint
            bottomOffset="30%"
            onEnter={() => {
                if (!show) setShow(true);
            }}>
            <PageParentU>
                <animated.div style={reveal}>{children}</animated.div>
            </PageParentU>
        </Waypoint>
    );
};

const PageParent = styled.div`
    perspective: 800px;

    div {
        width: 100%;
        height: 100%;
    }
`;
const PageParentU = styled.div`
    perspective: 1200px;
    perspective-origin: 50% 0%;

    div {
        width: 100%;
        height: 100%;
    }
`;
