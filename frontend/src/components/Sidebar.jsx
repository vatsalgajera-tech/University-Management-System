import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Users, UserCheck, Bell, BookOpen, Calendar, LogOut, FileText, ClipboardList } from 'lucide-react';
const Sidebar = ({ routes }) => {
  const { user, logout } = useContext(AuthContext);
  const iconMap = {
    'Dashboard': <LayoutDashboard size={20} />,
    'Students': <Users size={20} />,
    'Professors': <UserCheck size={20} />,
    'Notice': <Bell size={20} />,
    'Notice Board': <Bell size={20} />,
    'Courses': <BookOpen size={20} />,
    'Subjects': <FileText size={20} />,
    'Leave': <Calendar size={20} />,
    'Attendance': <ClipboardList size={20} />,
    'Study Material': <BookOpen size={20} />,
    'Profile': <UserCheck size={20} />,
  };
  return (
    <div className="glass-panel" style={{ width: '250px', height: '100vh', display: 'flex', flexDirection: 'column', borderRadius: '0', borderRight: '1px solid var(--glass-border)' }}>
      <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: '1rem', margin: 0, background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: '1.2' }}>
          Nexus University of Technology
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>{user?.role} Portal</p>
      </div>
      <div style={{ flex: 1, padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {routes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              color: isActive ? 'white' : 'var(--text-secondary)',
              background: isActive ? 'var(--accent-primary)' : 'transparent',
              fontWeight: isActive ? '600' : '400',
              transition: 'all 0.2s',
            })}
          >
            {iconMap[route.name] || <FileText size={20} />}
            {route.name}
          </NavLink>
        ))}
      </div>
      <div style={{ padding: '1.5rem 1rem', borderTop: '1px solid var(--border-color)' }}>
        <button onClick={logout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', background: 'transparent', color: 'var(--danger)', borderRadius: 'var(--radius-md)' }}>
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
