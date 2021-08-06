import { useSelector } from "react-redux";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";

const Blur = () => {
    const { NavOn } = useSelector((state) => state.nav);
    const { ModOn } = useSelector((state) => state.mod);

    const blur = useSpring({
        opacity: NavOn || ModOn ? "1" : "0",
        diplay: NavOn || ModOn ? "block" : "none",
        pointerEvents: NavOn || ModOn ? "all" : "none",
    });

    return <Blured style={blur} />;
};

export default Blur;

const Blured = styled(animated.div)`
    opacity: 0;
    diplay: block;
    pointer-events: none;
    position: fixed;
    width: 100vw;
    height: 100%;

    z-index: 7;
    backdrop-filter: blur(20px);
`;
