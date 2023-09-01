import { AnyAction } from "@/types";
import { RUN_CODE, UPDATE_LANG } from "actions/types";

const initState = {
  language: 63
}

const editorReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case RUN_CODE:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_LANG:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default editorReducer;
