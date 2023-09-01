import { AnyAction } from "@/types";
import {
  UPDATE_INTERVIEWS,
  UPDATE_WRITTENEXAM
} from "@/actions/types";

const initState = {
  interviewlist: [],
  writtenexamlist: []
};

const interviewReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case UPDATE_INTERVIEWS:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_WRITTENEXAM:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default interviewReducer;
