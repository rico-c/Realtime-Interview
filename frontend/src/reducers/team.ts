import { AnyAction } from "@/types";
import { CURRENT_TEAM } from "@/actions/types";

const teamReducer = (state = null, action: AnyAction) => {
  switch (action.type) {
    case CURRENT_TEAM:
      return action.payload;
    default:
      return null;
  }
};

export default teamReducer;
