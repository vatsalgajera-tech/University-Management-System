import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Calendar, CheckCircle, XCircle, Trash2 } from 'lucide-react';
const ManageLeaves = () => {
  const { user } = useContext(AuthContext);
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const getApiEndpoint = () => {
    return user.role === 'Admin'
      ? 'http://localhost:5000/api/admin/leaves'
      : 'http://localhost:5000/api/professor/leaves';
  };
  useEffect(() => {
    fetchLeaves();
  }, [user.role]);
  const fetchLeaves = async () => {
    try {
      const res = await axios.get(getApiEndpoint());
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleStatusChange = async (id, status) => {
    try {
      const endpoint = user.role === 'Admin'
        ? `http://localhost:5000/api/admin/leaves/${id}`
        : `http://localhost:5000/api/professor/leaves/${id}`;
      await axios.put(endpoint, { status });
      fetchLeaves();
    } catch {
      alert('Error updating leave status');
    }
  };
  const handleDeleteLeave = async (id) => {
    if (!window.confirm('Are you sure you want to delete this leave request?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/leaves/${id}`);
      fetchLeaves();
    } catch {
      alert('Error deleting leave request');
    }
  };
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved': return <span style={{ color: 'var(--success)' }}>Approved</span>;
      case 'Rejected': return <span style={{ color: 'var(--danger)' }}>Rejected</span>;
      default: return <span style={{ color: 'var(--warning)' }}>Pending</span>;
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2>Leave Requests</h2>
      </div>
      <div className="glass-panel" style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan="5" className="text-center">Loading...</td></tr> :
             leaves.map(leave => (
              <tr key={leave._id}>
                <td>{leave.student?.name || 'Unknown'}</td>
                <td>{formatDate(leave.date)}</td>
                <td>{leave.reason}</td>
                <td>{getStatusBadge(leave.status)}</td>
                <td>
                  {leave.status === 'Pending' ? (
                    <div className="flex items-center gap-4">
                      <button onClick={() => handleStatusChange(leave._id, 'Approved')} style={{ background: 'var(--success)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', color: 'white' }}>Approve</button>
                      <button onClick={() => handleStatusChange(leave._id, 'Rejected')} style={{ background: 'var(--danger)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', color: 'white' }}>Reject</button>
                      {user.role === 'Admin' && (
                        <button onClick={() => handleDeleteLeave(leave._id)} style={{ background: 'transparent', color: 'var(--danger)', padding: '0.25rem', border: 'none', cursor: 'pointer', marginLeft: 'auto' }} title="Delete Record">
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Decided</span>
                      {user.role === 'Admin' && (
                        <button onClick={() => handleDeleteLeave(leave._id)} style={{ background: 'transparent', color: 'var(--danger)', padding: '0.25rem', border: 'none', cursor: 'pointer', marginLeft: 'auto' }} title="Delete Record">
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {leaves.length === 0 && !loading && <tr><td colSpan="5" className="text-center">No leave requests found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManageLeaves;
