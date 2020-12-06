import { AnyAction } from "@/types";
import { UPDATE_INTERVIEWS } from "@/actions/types";

const interviewReducer = (state = {}, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_INTERVIEWS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default interviewReducer;
