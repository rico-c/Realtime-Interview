import { AnyAction } from "@/types";
import { UPDATE_USER } from "@/actions/types";

const accoutReducer = (state = {}, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default accoutReducer;
