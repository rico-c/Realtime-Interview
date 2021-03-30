import React, { FC, useCallback } from "react";
import WrittenHeader from '@/components/dashboard/writtenexam/writtenHeader'
import WrittenTable from '@/components/dashboard/writtenexam/writtenTable'
import './writtenExam.scss';

const WrittenExam: FC = () => {
  return (
    <div className="written-exam">
      <WrittenHeader />
      <WrittenTable />
    </div>
  )
}

export default WrittenExam;