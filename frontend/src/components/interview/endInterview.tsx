import React, { FC, useCallback, useState, useEffect, useMemo } from "react";
import { Rate, Form } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchInterviews } from "@/actions";

const EndInterview: FC = () => {
  const [rateNumber, setRateNumber] = useState(0);
  const rateChange = useCallback(
    (rate) => {
      setRateNumber(rate);
      console.log(rate);
    },
    [],
  )
  return (
    <div className="end-interview">
      <Form>
        <Form.Item
          name="rate"
          label="面试评分"
        >
          <Rate allowHalf onChange={rateChange} />
          <span>{rateNumber}</span>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EndInterview;
