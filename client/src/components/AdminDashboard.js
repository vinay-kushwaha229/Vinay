import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [jobSeekers, setJobSeekers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const config = getConfig();

      if (activeTab === 'stats') {
        const response = await axios.get('http://localhost:5000/api/admin/stats', config);
        setStats(response.data);
      } else if (activeTab === 'users') {
        const response = await axios.get('http://localhost:5000/api/admin/users', config);
        setUsers(response.data);
      } else if (activeTab === 'agencies') {
        const response = await axios.get('http://localhost:5000/api/admin/agencies', config);
        setAgencies(response.data);
      } else if (activeTab === 'jobSeekers') {
        const response = await axios.get('http://localhost:5000/api/admin/job-seekers', config);
        setJobSeekers(response.data);
      } else if (activeTab === 'messages') {
        const response = await axios.get('http://localhost:5000/api/admin/messages', config);
        setMessages(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
      if (err.response?.status === 403) {
        alert('Access denied. Admin only.');
        navigate('/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/admin/user/${userId}`,
        getConfig()
      );
      alert('User deleted successfully');
      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete user');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>🔐 Admin Panel</h1>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>

      <div className="admin-tabs">
        <button 
          className={activeTab === 'stats' ? 'tab-active' : ''}
          onClick={() => setActiveTab('stats')}
        >
          📊 Statistics
        </button>
        <button 
          className={activeTab === 'users' ? 'tab-active' : ''}
          onClick={() => setActiveTab('users')}
        >
          👥 All Users
        </button>
        <button 
          className={activeTab === 'agencies' ? 'tab-active' : ''}
          onClick={() => setActiveTab('agencies')}
        >
          🏢 Agencies
        </button>
        <button 
          className={activeTab === 'jobSeekers' ? 'tab-active' : ''}
          onClick={() => setActiveTab('jobSeekers')}
        >
          💼 Job Seekers
        </button>
        <button 
          className={activeTab === 'messages' ? 'tab-active' : ''}
          onClick={() => setActiveTab('messages')}
        >
          💬 Messages
        </button>
      </div>

      <div className="admin-content">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            {activeTab === 'stats' && (
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Users</h3>
                  <p className="stat-number">{stats.totalUsers}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Agencies</h3>
                  <p className="stat-number">{stats.totalAgencies}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Job Seekers</h3>
                  <p className="stat-number">{stats.totalJobSeekers}</p>
                </div>
                <div className="stat-card">
                  <h3>Pending Approvals</h3>
                  <p className="stat-number">{stats.pendingApprovals}</p>
                </div>
                <div className="stat-card">
                  <h3>Approved Job Seekers</h3>
                  <p className="stat-number">{stats.approvedJobSeekers}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Messages</h3>
                  <p className="stat-number">{stats.totalMessages}</p>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="table-container">
                <h2>All Users ({users.length})</h2>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Verified</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.first_name} {user.last_name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td><span className={`badge badge-${user.user_type.toLowerCase().replace(' ', '-')}`}>{user.user_type}</span></td>
                        <td><span className={`badge badge-${user.status}`}>{user.status}</span></td>
                        <td>{user.is_verified ? '✅' : '❌'}</td>
                        <td>{new Date(user.created_at).toLocaleDateString()}</td>
                        <td>
                          {user.user_type !== 'Admin' && (
                            <button 
                              className="btn-delete-small"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'agencies' && (
              <div className="cards-container">
                <h2>All Agencies ({agencies.length})</h2>
                {agencies.map(agency => (
                  <div key={agency.id} className="admin-card">
                    <h3>{agency.first_name} {agency.last_name}</h3>
                    <p><strong>Email:</strong> {agency.email}</p>
                    <p><strong>Phone:</strong> {agency.phone}</p>
                    <p><strong>Gender:</strong> {agency.gender}</p>
                    <p><strong>Hobbies:</strong> {agency.hobbies.join(', ') || 'None'}</p>
                    <p><strong>Verified:</strong> {agency.is_verified ? '✅ Yes' : '❌ No'}</p>
                    <p><strong>Joined:</strong> {new Date(agency.created_at).toLocaleString()}</p>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDeleteUser(agency.id)}
                    >
                      Delete Agency
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'jobSeekers' && (
              <div className="cards-container">
                <h2>All Job Seekers ({jobSeekers.length})</h2>
                {jobSeekers.map(seeker => (
                  <div key={seeker.id} className="admin-card">
                    <h3>{seeker.first_name} {seeker.last_name}</h3>
                    <p><strong>Email:</strong> {seeker.email}</p>
                    <p><strong>Phone:</strong> {seeker.phone}</p>
                    <p><strong>Gender:</strong> {seeker.gender}</p>
                    <p><strong>Agency:</strong> {seeker.agency_name}</p>
                    <p><strong>Status:</strong> <span className={`badge badge-${seeker.status}`}>{seeker.status}</span></p>
                    <p><strong>Hobbies:</strong> {seeker.hobbies.join(', ') || 'None'}</p>
                    {seeker.resume && (
                      <p><strong>Resume:</strong> <a href={`http://localhost:5000/uploads/resumes/${seeker.resume}`} target="_blank" rel="noreferrer">View</a></p>
                    )}
                    <p><strong>Joined:</strong> {new Date(seeker.created_at).toLocaleString()}</p>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDeleteUser(seeker.id)}
                    >
                      Delete Job Seeker
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="table-container">
                <h2>Recent Messages ({messages.length})</h2>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Message</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map(msg => (
                      <tr key={msg.id}>
                        <td>{msg.id}</td>
                        <td>
                          {msg.sender_first_name} {msg.sender_last_name}
                          <br />
                          <small>({msg.sender_type})</small>
                        </td>
                        <td>
                          {msg.receiver_first_name} {msg.receiver_last_name}
                          <br />
                          <small>({msg.receiver_type})</small>
                        </td>
                        <td className="message-text">{msg.message}</td>
                        <td>{new Date(msg.created_at).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
