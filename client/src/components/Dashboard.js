import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
    fetchData(userData.userType);
  }, []);

  const fetchData = async (userType) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (userType === 'Agency') {
        const response = await axios.get('http://localhost:5000/api/users/job-seekers', config);
        setData(response.data);
      } else {
        const response = await axios.get('http://localhost:5000/api/users/my-agency', config);
        setData([response.data]);
      }
    } catch (err) {
      console.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (jobSeekerId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:5000/api/users/job-seeker/${jobSeekerId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      fetchData(user.userType);
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) return <div className="container">Loading...</div>;

  // Redirect admin to admin panel
  if (user?.userType === 'Admin') {
    navigate('/admin');
    return null;
  }

  return (
    <div className="container dashboard-container">
      <div className="header">
        <h2>Dashboard - {user?.userType}</h2>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>

      {user?.userType === 'Agency' ? (
        <>
          <h3>Job Seekers</h3>
          {data.length === 0 ? (
            <p>No job seekers have selected your agency yet.</p>
          ) : (
            data.map(jobSeeker => (
              <div key={jobSeeker.id} className="user-card">
                <h3>{jobSeeker.first_name} {jobSeeker.last_name}</h3>
                <p><strong>Email:</strong> {jobSeeker.email}</p>
                <p><strong>Phone:</strong> {jobSeeker.phone}</p>
                <p><strong>Gender:</strong> {jobSeeker.gender}</p>
                <p><strong>Hobbies:</strong> {jobSeeker.hobbies?.join(', ') || 'None'}</p>
                {jobSeeker.resume && (
                  <p><strong>Resume:</strong> <a href={`http://localhost:5000/uploads/resumes/${jobSeeker.resume}`} target="_blank" rel="noreferrer">View Resume</a></p>
                )}
                <span className={`status-badge status-${jobSeeker.status}`}>
                  {jobSeeker.status.toUpperCase()}
                </span>
                
                <div className="action-buttons">
                  {jobSeeker.status === 'pending' && (
                    <>
                      <button 
                        className="btn-approve"
                        onClick={() => handleStatusUpdate(jobSeeker.id, 'approved')}
                      >
                        Approve
                      </button>
                      <button 
                        className="btn-decline"
                        onClick={() => handleStatusUpdate(jobSeeker.id, 'declined')}
                      >
                        Decline
                      </button>
                    </>
                  )}
                  {jobSeeker.status === 'approved' && (
                    <button 
                      className="btn-chat"
                      onClick={() => navigate(`/chat/${jobSeeker.id}`)}
                    >
                      Chat
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </>
      ) : (
        <>
          <h3>My Agency</h3>
          {data.length > 0 && data[0] ? (
            <div className="user-card">
              <h3>{data[0].first_name} {data[0].last_name}</h3>
              <p><strong>Email:</strong> {data[0].email}</p>
              <p><strong>Phone:</strong> {data[0].phone}</p>
              <span className={`status-badge status-${data[0].status}`}>
                {data[0].status.toUpperCase()}
              </span>
              
              {data[0].status === 'approved' && (
                <div className="action-buttons">
                  <button 
                    className="btn-chat"
                    onClick={() => navigate(`/chat/${data[0].id}`)}
                  >
                    Chat with Agency
                  </button>
                </div>
              )}
              
              {data[0].status === 'pending' && (
                <p style={{ marginTop: '10px', color: '#666' }}>
                  Waiting for agency approval...
                </p>
              )}
            </div>
          ) : (
            <p>No agency selected.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
