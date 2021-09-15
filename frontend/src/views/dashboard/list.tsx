import React, { FC, useState } from "react";
import InterviewHeader from '@/components/dashboard/interviews/interviewHeader'
import InterviewTable from '@/components/dashboard/interviews/interviewTable'
import './list.scss';

const List: FC = () => {
  const [query, setQuery] = useState<string>('');
  return (
    <div className="home-page">
      <InterviewHeader setQuery={setQuery} />
      <InterviewTable query={query} />
    </div>
  )
}

export default List;