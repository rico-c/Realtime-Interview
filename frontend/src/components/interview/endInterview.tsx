import React, { FC, useCallback, useState, useEffect, useMemo } from "react";
import { Rate, Form, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchInterviews } from "@/actions";

const { TextArea } = Input;

interface EndProp {
  closeModal?: any
}

const EndInterview: FC<EndProp> = (props) => {
  const { closeModal } = props;
  const [rateNumber, setRateNumber] = useState(0);
  const rateChange = useCallback(
    (rate) => {
      setRateNumber(rate);
    },
    [],
  )

  const onFinish = useCallback(
    (values) => {
      console.log(values);
    },
    [],
  )
  return (
    <div className="end-interview">
      <Form
        requiredMark={false}
        onFinish={onFinish}>
        <Form.Item
          name="rate"
          label="面试评分"
          rules={[{ required: true, message: "请为面试者本场表现打分" }]}
        >
          <Rate allowHalf onChange={rateChange} />
        </Form.Item>
        <Form.Item
          name="commentContent"
          label="面试评价"
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">确认结束面试</Button>
          <Button onClick={closeModal}>取消</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EndInterview;
