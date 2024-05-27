import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../../pages/DashboardPage';

const DashboardRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
    </Routes>
  );
};

export default DashboardRoutes;