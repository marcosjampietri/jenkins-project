import React, { useRef, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { animated, useSpring, config, useTransition } from "react-spring";
import styled from "styled-components";
import { modAction } from "../../store/actions/modActions";

import { FiX } from "react-icons/fi";

const useOutsideAlerter = (ref) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                dispatch(modAction());
            }
        };

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
};

const Modal = ({ children }) => {
    const dispatch = useDispatch();
    const wrapperRef = useRef(null);

    useOutsideAlerter(wrapperRef);

    //access rootReducer
    const { ModOn } = useSelector((state) => state.mod);
    const ModOff = () => {
        if (ModOn) {
            dispatch(modAction());
        }
    };

    const transitions = useTransition(ModOn, {
        from: { opacity: 0, y: 50 },
        enter: { opacity: 1, y: 0 },
        leave: { opacity: 0 },
        reverse: ModOn,
        delay: 0,
        config: config.slow,
    });

    return transitions((styles, item) =>
        item ? (
            <ModalSt style={styles}>
                <Box ref={wrapperRef}>
                    <Cross onClick={ModOff}>
                        <FiX />
                    </Cross>
                    <Content>{children}</Content>
                </Box>
            </ModalSt>
        ) : null
    );
};

export default Modal;

const ModalSt = styled(animated.div)`
    position: fixed;
    width: 100vw;
    height: 100vh;

    opacity: 1;
    diplay: block;

    z-index: 9999999;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const Box = styled.div`
    position: relative;
    width: 80vw;
    height: 60vh;

    border-radius: 10px;
    background: white;
    box-shadow: 2px 2px 20px hsla(0, 0%, 0%, 0.3);

    display: flex;
    justify-content: center;
    align-items: center;
`;
const Content = styled.div`
    width: 90%;
    height: 90%;

    object-fit: cover;
`;
const Cross = styled.div`
    position: absolute;
    top: -25px;
    right: -25px;
    width: 50px;
    height: 50px;

    cursor: pointer;
    background: white;
    border-radius: 50%;
    box-shadow: 2px 2px 10px hsla(0, 0%, 0%, 0.3);

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        font-size: 2em;
    }
`;
