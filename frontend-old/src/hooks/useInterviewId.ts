import {
  useRouteMatch
} from "react-router-dom";

export const useInterviewId = () => {
  const match = useRouteMatch('/interview/:id');
  if (match) {
    return (match as any).params.id;
  }
  return null;
}