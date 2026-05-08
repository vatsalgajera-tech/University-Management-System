import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import AdminDashboard from '../pages/AdminDashboard';
import AdminUsers from '../pages/AdminUsers';
import AdminCourses from '../pages/AdminCourses';
import AdminSubjects from '../pages/AdminSubjects';
import NoticeBoard from '../pages/NoticeBoard';
import ManageLeaves from '../pages/ManageLeaves';
const AdminLayout = () => {
  const routes = [
    { path: '/admin/dashboard', name: 'Dashboard' },
    { path: '/admin/students', name: 'Students' },
    { path: '/admin/professors', name: 'Professors' },
    { path: '/admin/courses', name: 'Courses' },
    { path: '/admin/subjects', name: 'Subjects' },
    { path: '/admin/notices', name: 'Notice Board' },
    { path: '/admin/leaves', name: 'Leave Requests' },
  ];
  return (
    <div className="flex" style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Sidebar routes={routes} />
      <div className="flex-1" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <TopNav title="System Administration" />
        <div style={{ padding: '2rem', overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students" element={<AdminUsers userRole="Student" />} />
            <Route path="professors" element={<AdminUsers userRole="Professor" />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="subjects" element={<AdminSubjects />} />
            <Route path="notices" element={<NoticeBoard />} />
            <Route path="leaves" element={<ManageLeaves />} />
            <Route path="*" element={<AdminDashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default AdminLayout;
