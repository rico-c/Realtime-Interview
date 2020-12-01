import { AnyAction } from "@/types";
import { RUN_CODE } from "@/actions/types";

const editorReducer = (state = {}, action: AnyAction) => {
  switch (action.type) {
    case RUN_CODE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default editorReducer;
