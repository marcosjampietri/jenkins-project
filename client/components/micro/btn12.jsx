import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

const Btn12 = ({ text }) => {
    const dispatch = useDispatch();

    return (
        <div>
            <Block>
                <Btn12Styled>
                    <span>SEND ME A MESSAGE</span>
                    <span>{text}</span>
                </Btn12Styled>
            </Block>
        </div>
    );
};

export default Btn12;

const Block = styled.div`
    position: relative;
    top: 0;
    left: 0;
    width: 260px;
    height: 80px;
    margin: 50px 0px;
    text-align: center;

    :hover {
        button {
            span {
                :nth-child(1) {
                    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
                        7px 7px 20px 0px rgba(0, 0, 0, 0.1),
                        4px 4px 5px 0px rgba(0, 0, 0, 0.1);
                    transform: rotateX(0deg);
                }
                :nth-child(2) {
                    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
                        7px 7px 20px 0px rgba(0, 0, 0, 0.1),
                        4px 4px 5px 0px rgba(0, 0, 0, 0.1);
                    color: transparent;
                    transform: rotateX(-90deg);
                }
            }
        }
    }
`;

const Btn12Styled = styled.button`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    color: #fff;
    border-radius: 5px;
    font-family: "arial black";
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    transition: 1s;
    transition-timing-function: cubic-bezier(0.98, 0, 0, 0.99);
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
        7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    outline: none;
    border: none;
    box-shadow: none;
    line-height: 60px;
    perspective: 900px;
    perspective-origin: 30%;

    span {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        pointer-events: none;
        text-align: center;

        background: linear-gradient(
            0deg,
            hsla(350, 90%, 45%, 1) 0%,
            hsla(350, 70%, 55%, 1) 100%
        );
        box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
            7px 7px 20px 0px rgba(0, 0, 0, 0.1),
            4px 4px 5px 0px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        transition: 1s;
        transition-timing-function: cubic-bezier(0.98, 0, 0, 0.99);
        color: white;

        display: flex;
        align-items: center;
        justify-content: center;

        :nth-child(1) {
            transform: rotateX(90deg);
            transform-origin: 50% 50% -40px;
        }
        :nth-child(2) {
            transform: rotateX(0deg);
            transform-origin: 50% 50% -40px;
            backface-visibility: hidden;
        }
    }
`;
