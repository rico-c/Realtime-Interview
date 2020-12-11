import { AnyAction } from "@/types";
import { UPDATE_INTERVIEWS,UPDATE_TEAM } from "@/actions/types";

const initState = {
    list: [],
    currentTeam: null
}

const interviewReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_INTERVIEWS:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_TEAM:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default interviewReducer;
