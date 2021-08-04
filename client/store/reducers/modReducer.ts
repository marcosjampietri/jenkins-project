import Video from "../../components/modal/video";
import Pic from "../../components/modal/pictures";

const initState = {
  ModOn: false,
  ModComponent: null,
};

const components = [<Video />, <Pic />];

export const modReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "TOGGLE_MOD_VIDEO":
      return {
        ...state,
        ModOn: true,
        ModComponent: components[0],
      };
    case "TOGGLE_MOD_PIC":
      return {
        ...state,
        ModOn: true,
        ModComponent: components[1],
      };
    case "TOGGLE_MOD_OFF":
      return {
        ...state,
        ModOn: false,
      };
    default:
      return {
        ...state,
      };
  }
};
