import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserPlus, Edit2, Trash2 } from 'lucide-react';
const AdminUsers = ({ userRole }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: userRole, enrolledCourse: '', assignedCourses: []
  });
  const [editingId, setEditingId] = useState(null);
  useEffect(() => {
    fetchUsers();
    if (userRole === 'Student' || userRole === 'Professor') {
      fetchCourses();
    }
  }, [userRole]);
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/users?role=${userRole}`);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/courses');
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/admin/users/${editingId}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/admin/users', formData);
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({
        name: '', email: '', password: '', role: userRole, enrolledCourse: '', assignedCourses: []
      });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving user');
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
        fetchUsers();
      } catch {
        alert('Error deleting user');
      }
    }
  };
  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      enrolledCourse: user.enrolledCourse?._id || '',
      assignedCourses: user.assignedCourses?.map(c => c._id) || []
    });
    setEditingId(user._id);
    setShowForm(true);
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2>Manage {userRole}s</h2>
        <button className="btn btn-primary" onClick={() => {
          setShowForm(!showForm);
          setEditingId(null);
          setFormData({
            name: '', email: '', password: '', role: userRole, enrolledCourse: '', assignedCourses: []
          });
        }}>
          <UserPlus size={18} style={{ marginRight: '0.5rem' }} /> Add {userRole}
        </button>
      </div>
      {showForm && (
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          <h3>{editingId ? 'Edit' : 'Add'} {userRole}</h3>
          <form onSubmit={handleSubmit} className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input type="text" className="form-input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label">Password {editingId && '(Leave blank to keep unchanged)'}</label>
              <input type="password" className="form-input" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required={!editingId} />
            </div>
            {userRole === 'Student' && (
              <>
                <div className="form-group">
                  <label className="form-label">Enrolled Course / Department</label>
                  <select className="form-input" value={formData.enrolledCourse} onChange={(e) => setFormData({...formData, enrolledCourse: e.target.value})} required>
                    <option value="">Select Course</option>
                    {courses.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                </div>
              </>
            )}
            {userRole === 'Professor' && (
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Assigned Courses</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem', marginTop: '0.5rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  {courses.map(c => (
                    <label key={c._id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', margin: 0 }}>
                      <input
                        type="checkbox"
                        checked={formData.assignedCourses.includes(c._id)}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setFormData(prev => {
                            const updatedCourses = isChecked
                              ? [...prev.assignedCourses, c._id]
                              : prev.assignedCourses.filter(id => id !== c._id);
                            return { ...prev, assignedCourses: updatedCourses };
                          });
                        }}
                        style={{ margin: 0, width: '16px', height: '16px', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{c.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            <div style={{ gridColumn: 'span 2' }}>
              <button type="submit" className="btn btn-primary" style={{ marginRight: '1rem' }}>Save changes</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      <div className="glass-panel" style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {userRole === 'Student' && <th>Course</th>}
              {userRole === 'Professor' && <th>Assigned Courses</th>}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan="4" className="text-center">Loading...</td></tr> :
             users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {userRole === 'Student' && <td>{user.enrolledCourse?.name || 'Unassigned'}</td>}
                {userRole === 'Professor' && <td>{user.assignedCourses?.map(c => c.name).join(', ') || 'None'}</td>}
                <td>
                  <button onClick={() => handleEdit(user)} style={{ background: 'transparent', color: 'var(--accent-primary)', marginRight: '1rem' }}><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(user._id)} style={{ background: 'transparent', color: 'var(--danger)' }}><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
            {users.length === 0 && !loading && <tr><td colSpan="5" className="text-center">No {userRole}s found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminUsers;
