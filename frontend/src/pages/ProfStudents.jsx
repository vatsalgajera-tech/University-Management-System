import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ProfStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/professor/students');
        setStudents(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2>My Students</h2>
      </div>
      <div className="glass-panel" style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Enrolled Course</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan="3" className="text-center">Loading...</td></tr> :
             students.map(student => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.enrolledCourse?.name || 'N/A'}</td>
              </tr>
            ))}
            {students.length === 0 && !loading && <tr><td colSpan="3" className="text-center">No students found in your assigned courses.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ProfStudents;
