import { useState, useEffect } from "react";
import { getInterviewAPI } from "utils/api";
import axios from "axios";

export const useInterviewDetail = (roomId: string) => {
  const [detail, setDetail] = useState(null);
  useEffect(() => {
    if (roomId) {
      axios
        .get(getInterviewAPI, {
          params: {
            roomId,
          },
        })
        .then((res) => {
          if (res.data && res.data.code === 0) {
            setDetail(res.data.data);
          }
        });
    }
  }, [roomId]);
  return detail;
};
