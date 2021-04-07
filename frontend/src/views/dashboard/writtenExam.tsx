import React, { FC, useCallback } from "react";
import WrittenHeader from '@/components/dashboard/writtenexam/writtenHeader'
import WrittenTable from '@/components/dashboard/writtenexam/writtenTable'
import BreadNavigator from '@/components/common/breadNavigator';
import './writtenExam.scss';

const WrittenExam: FC = () => {
  const breadData = [{
    name: '笔试',
    path: '/dashboard/writtenexamlist'
  }]

  return (
    <div className="written-exam">
      <WrittenHeader />
      <BreadNavigator data={breadData} />
      <WrittenTable />
    </div>
  )
}

export default WrittenExam;