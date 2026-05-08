import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import ProfDashboard from '../pages/ProfDashboard';
import ProfStudents from '../pages/ProfStudents';
import ProfAttendance from '../pages/ProfAttendance';
import ProfMaterials from '../pages/ProfMaterials';
import ManageLeaves from '../pages/ManageLeaves';
import NoticeBoard from '../pages/NoticeBoard';
const ProfessorLayout = () => {
  const routes = [
    { path: '/professor/dashboard', name: 'Dashboard' },
    { path: '/professor/students', name: 'My Students' },
    { path: '/professor/attendance', name: 'Attendance' },
    { path: '/professor/studymaterial', name: 'Study Material' },
    { path: '/professor/leaves', name: 'Leave Approvals' },
    { path: '/professor/notices', name: 'Notice Board' },
  ];
  return (
    <div className="flex" style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Sidebar routes={routes} />
      <div className="flex-1" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TopNav title="Professor Portal" />
        <div style={{ padding: '2rem', overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<ProfDashboard />} />
            <Route path="students" element={<ProfStudents />} />
            <Route path="attendance" element={<ProfAttendance />} />
            <Route path="studymaterial" element={<ProfMaterials />} />
            <Route path="leaves" element={<ManageLeaves />} />
            <Route path="notices" element={<NoticeBoard />} />
            <Route path="*" element={<ProfDashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default ProfessorLayout;
