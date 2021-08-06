import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { animated, useSpring, useTransition, config } from "react-spring";
import { navAction } from "../../store/actions/navActions";
import { below } from "../../styles/breakpoint";
import useScrollTo from "react-spring-scroll-to-hook";

import Burguer from "../micro/hamburguer";

const NavBar = () => {
    const links = [
        { name: "HOME", path: "/" },
        { name: "SERVICES", path: "/services" },
        { name: "CONTACT", path: "/contact" },
        { name: "ABOUT", path: "/about" },
    ];

    const dispatch = useDispatch();
    const router = useRouter();
    //access rootReducer
    const { NavOn } = useSelector((state) => state.nav);

    //dispatch buttons
    const toggleNav = () => {
        if (NavOn) {
            dispatch(navAction());
        }
    };
    const { scrollTo } = useScrollTo(config.slow);

    return (
        <NavBarSt>
            <Link href="/">
                <a
                    onClick={() => {
                        scrollTo();
                        toggleNav();
                    }}>
                    <Logo src="/icons/V.svg" />
                </a>
            </Link>
            <Options>
                {links.map((item, index) => (
                    <Link key={index} href={item.path}>
                        <div>
                            <div>{item.name}</div>
                            <a>{item.name}</a>
                        </div>
                    </Link>
                ))}
            </Options>
            <Burguer />
        </NavBarSt>
    );
};

export default NavBar;

const NavBarSt = styled.div`
    position: fixed;
    width: 100%;
    height: 120px;

    background: hsla(220, 10%, 85%, 0.1);
    z-index: 100;
    transition: 0.5s;

    display: flex;
    align-items: center;
    justify-content: space-around;

    :hover {
    transition: 0.2s;
    background: hsla(220, 10%, 85%, 0.95);

    }
`;

const Logo = styled.img`
    width: 70px;
    height: 70px;
    justify-self: flex-end;
    background: transparent;
    margin-left: 40px;
    border: none;

    filter: drop-shadow(0px 0px 50px hsla(0, 100%, 100%, 0.7));
`;

const Options = styled.div`
    width: 50%;

    display: flex;
    justify-content: space-around;

    ${below.med`
       display: none;
     `};

    div {
        position: relative;
        background: blue;

        cursor: pointer;
        transition: all 0.6s;
        transition-timing-function: cubic-bezier(0.98, 0, 0, 0.99);

        div {
            height: 1.6em;
            position: absolute;
            top: -6px;
            left: -6px;
            padding: 4px;
            transform: scaleX(0);
            transform-origin: left;

            color: transparent;
            background: hsla(342, 90%, 50%, 1);
        }

        a {
            transition: all 0.8s;
            position: absolute;
        }
        :hover {
            transition: all 0.8s;
            transition-timing-function: cubic-bezier(0.98, 0, 0, 0.99);
            div {
                transform: scaleX(1);
            }
            a {
                transition: all 0.8s;
                color: white;
            }
        }
    }
`;
