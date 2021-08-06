import styled, { keyframes } from "styled-components";

const Btn11 = ({ direction }) => {
  return (
    <Block>
      <Btn11Styled href={direction} target="_blank" rel="noreferrer">
        {" "}
        CODE ON GITHUB
        <div className="dot"></div>
      </Btn11Styled>
    </Block>
  );
};

export default Btn11;

const Block = styled.div`
  margin: 20px 0px;
  background-color: transparent;
`;

const shining = keyframes`
0% {
-webkit-transform: scale(0) rotate(45deg);
opacity: 0;
}
80% {
-webkit-transform: scale(0) rotate(45deg);
opacity: 0.5;
}
81% {
-webkit-transform: scale(4) rotate(45deg);
opacity: 0.9;
}
100% {
-webkit-transform: scale(50) rotate(45deg);
opacity: 0;
}
`;

const Btn11Styled = styled.a`
  text-align: center;
  text-decoration: none;
  width: 180px;
  // height: 60px;
  color: #fff;
  border-radius: 5px;
  padding: 20px 10px;
  font-family: "arial black";
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;

  border: none;
  background: rgb(251, 33, 117);
  background: linear-gradient(
    0deg,
    rgba(251, 33, 117, 1) 0%,
    rgba(75, 53, 130, 1) 100%
  );
  color: #fff;
  overflow: hidden;

  :hover {
    text-decoration: none;
    color: #fff;
  }
  :before {
    position: absolute;
    content: "";
    display: inline-block;
    top: -180px;
    left: 0;
    width: 30px;
    height: 100%;
    background-color: #fff;
    animation: ${shining} 7s infinite;
  }
  :hover {
    opacity: 0.7;
  }
  :active {
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.3),
      -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.2),
      inset 4px 4px 6px 0 rgba(0, 0, 0, 0.2);
  }
`;
