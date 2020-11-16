import {
  useRouteMatch
} from "react-router-dom";

const useInterviewId = () => {
  const match = useRouteMatch('/interview/:id');
  if (match) {
    return (match as any).params.id;
  }
  return null;
}

export default useInterviewId;