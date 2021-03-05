import { AnyAction } from "@/types";
import { UPDATE_USER, DELETE_USER } from "@/actions/types";

const accoutReducer = (state = {}, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...action.payload,
        requested: true
      };
    case DELETE_USER:
      return {};
    default:
      return state;
  }
};

export default accoutReducer;
