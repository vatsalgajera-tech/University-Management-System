import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, Edit2, Trash2 } from 'lucide-react';
const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [courseFormData, setCourseFormData] = useState({ name: '', description: '', duration: '' });
  const [editingCourseId, setEditingCourseId] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const coursesRes = await axios.get('http://localhost:5000/api/admin/courses');
      setCourses(coursesRes.data);
    } catch {
      console.error('Error fetching courses');
    } finally {
      setLoading(false);
    }
  };
  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourseId) {
        await axios.put(`http://localhost:5000/api/admin/courses/${editingCourseId}`, courseFormData);
      } else {
        await axios.post('http://localhost:5000/api/admin/courses', courseFormData);
      }
      setShowCourseForm(false);
      setEditingCourseId(null);
      setCourseFormData({ name: '', description: '', duration: '' });
      fetchData();
    } catch {
      alert('Error saving course');
    }
  };
  const handleDeleteCourse = async (id) => {
    if (window.confirm('Warning: This may affect related subjects and students. Proceed?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/courses/${id}`);
        fetchData();
      } catch {
        alert('Error deleting course');
      }
    }
  };
  const handleEditCourse = (course) => {
    setCourseFormData({ name: course.name, description: course.description, duration: course.duration });
    setEditingCourseId(course._id);
    setShowCourseForm(true);
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2>Manage Courses</h2>
        <button className="btn btn-primary" onClick={() => { setShowCourseForm(!showCourseForm); setEditingCourseId(null); setCourseFormData({ name: '', description: '', duration: '' }); }}>
          <BookOpen size={18} style={{ marginRight: '0.5rem' }} /> Add Course
        </button>
      </div>
      {showCourseForm && (
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          <h3>{editingCourseId ? 'Edit' : 'Add'} Course</h3>
          <form onSubmit={handleCourseSubmit} className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Course Name</label>
              <input type="text" className="form-input" value={courseFormData.name} onChange={(e) => setCourseFormData({ ...courseFormData, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label className="form-label">Duration</label>
              <input type="text" className="form-input" value={courseFormData.duration} onChange={(e) => setCourseFormData({ ...courseFormData, duration: e.target.value })} required />
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Description</label>
              <textarea className="form-input" rows="3" value={courseFormData.description} onChange={(e) => setCourseFormData({ ...courseFormData, description: e.target.value })}></textarea>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <button type="submit" className="btn btn-primary" style={{ marginRight: '1rem' }}>Save changes</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowCourseForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      <div className="glass-panel" style={{ overflowX: 'auto', marginBottom: '3rem' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Duration</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan="4" className="text-center">Loading...</td></tr> :
              courses.map(course => (
                <tr key={course._id}>
                  <td>{course.name}</td>
                  <td>{course.duration}</td>
                  <td>{course.description}</td>
                  <td>
                    <button onClick={() => handleEditCourse(course)} style={{ background: 'transparent', color: 'var(--accent-primary)', marginRight: '1rem' }}><Edit2 size={18} /></button>
                    <button onClick={() => handleDeleteCourse(course._id)} style={{ background: 'transparent', color: 'var(--danger)' }}><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            {courses.length === 0 && !loading && <tr><td colSpan="4" className="text-center">No Courses found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminCourses;
