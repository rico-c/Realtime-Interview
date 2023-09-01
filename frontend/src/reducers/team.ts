import { AnyAction } from "@/types";
import { CURRENT_TEAM } from "actions/types";

const initState = { teamName: null, teamId: null };

const teamReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case CURRENT_TEAM:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default teamReducer;
