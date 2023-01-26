import { createStore } from "redux";

const initialState = {
  isListUpdate: false,
  isPopupClosed: false,
  canvas: null,
  toSave: false,
  compositionId: "",
  title: "",
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "updateList":
      return { ...state, ...rest };
    case "closePopup":
      return { ...state, ...rest };
    case "storeCanvas":
      return { ...state, ...rest };
    case "toSave":
      return { ...state, ...rest };
    case "composition":
      return { ...state, ...rest };
    case "setTitle":
      return { ...state, ...rest };
    default:
      return state;
  }
};

const store = createStore(changeState);
export default store;
