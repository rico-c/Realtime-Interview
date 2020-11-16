import React, { FC } from "react";
import {
  Link
} from "react-router-dom";
import './dashboard.scss';

const Dashboard: FC = () => {
  return (
    <div className="dashboard">
      dashboard
      <Link to="/interview">interview</Link>
    </div>
  )
}

export default Dashboard;