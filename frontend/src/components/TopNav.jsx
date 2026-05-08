import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
const TopNav = ({ title }) => {
  const { user } = useContext(AuthContext);
  return (
    <div className="glass-panel" style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0', borderBottom: '1px solid var(--glass-border)' }}>
      <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{title}</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span style={{ fontWeight: '600' }}>{user?.name}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.email}</span>
        </div>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
};
export default TopNav;
