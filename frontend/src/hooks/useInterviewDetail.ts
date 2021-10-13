import { useState, useEffect } from "react";
import { getInterviewAPI } from '@/utils/API';
import axios from "axios";

export const useInterviewDetail = (roomId: string) => {
    const [detail, setDetail] = useState(null)
    useEffect(() => {
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
    }, [roomId]);
    return detail;
};
