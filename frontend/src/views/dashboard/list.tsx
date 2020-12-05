import React, { FC, useCallback } from "react";
import InterviewHeader from '@/components/dashboard/interviews/interviewHeader'
import InterviewTable from '@/components/dashboard/interviews/interviewTable'
import './list.scss';

const List: FC = () => {
  return (
    <div className="home-page">
      <InterviewHeader />
      <InterviewTable />
    </div>
  )
}

export default List;