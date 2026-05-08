import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Save } from 'lucide-react';
const StudentProfile = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    courseName: ''
  });
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/profile');
        const data = res.data;
        setFormData({
          name: data.name || '',
          email: data.email || '',
          courseName: data.enrolledCourse?.name || 'Unassigned'
        });
      } catch (err) {
        console.error("Failed to fetch full profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user.token]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:5000/api/student/profile', {
        email: formData.email
      });
      const existingUserStr = localStorage.getItem('user');
      if (existingUserStr) {
        const u = JSON.parse(existingUserStr);
        u.email = res.data.email;
        localStorage.setItem('user', JSON.stringify(u));
      }
      alert('Profile updated successfully');
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update profile');
    }
  };
  if (loading) return <p>Loading profile...</p>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 100px)' }}>
      <h2 style={{ marginBottom: '2rem' }}>My Profile</h2>
      <div className="glass-panel" style={{ padding: '2rem', width: '100%', maxWidth: '500px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input type="text" className="form-input" value={formData.name} disabled />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          </div>
          <div className="form-group">
            <label className="form-label">Course</label>
            <input type="text" className="form-input" value={formData.courseName} disabled />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
            <Save size={18} style={{ marginRight: '0.5rem' }} /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};
export default StudentProfile;
