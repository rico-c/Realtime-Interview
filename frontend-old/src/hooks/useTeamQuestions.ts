import { useState, useEffect } from "react";
import { getTeamQuestionsAPI } from "@/utils/api";
import axios from "axios";

export const useTeamQuestions = (teamId: string) => {
    const [questionList, setQuestionList] = useState([]);
    useEffect(() => {
      axios
        .get(getTeamQuestionsAPI, {
          params: {
            teamId
          }
        })
        .then(res => {
          if (res.data && res.data.code === 0) {
            setQuestionList(res.data.data);
          }
        });
    }, []);
    return questionList || [];
};
