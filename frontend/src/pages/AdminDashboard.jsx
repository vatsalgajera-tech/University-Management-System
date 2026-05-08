import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, UserCheck, BookOpen } from 'lucide-react';
const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalStudents: 0, totalProfessors: 0, totalCourses: 0 });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/dashboard');
        setStats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);
  if (loading) return <div>Loading dashboard...</div>;
  const statCards = [
    { title: 'Total Students', value: stats.totalStudents, icon: <Users size={24} color="var(--accent-primary)" />, bg: 'rgba(59, 130, 246, 0.1)' },
    { title: 'Total Professors', value: stats.totalProfessors, icon: <UserCheck size={24} color="var(--success)" />, bg: 'rgba(16, 185, 129, 0.1)' },
    { title: 'Total Courses', value: stats.totalCourses, icon: <BookOpen size={24} color="var(--warning)" />, bg: 'rgba(245, 158, 11, 0.1)' },
  ];
  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>System Overview</h2>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {statCards.map((card, index) => (
          <div key={index} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ background: card.bg, padding: '1rem', borderRadius: '50%' }}>
              {card.icon}
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{card.title}</p>
              <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{card.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminDashboard;
