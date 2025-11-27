import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userId = localStorage.getItem('tempUserId');
      await axios.post('http://localhost:5000/api/auth/verify-otp', { userId, otp });
      navigate('/set-password');
    } catch (err) {
      setError(err.response?.data?.error || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Verify OTP</h2>
      <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>
        Please enter the OTP sent to your email
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Enter OTP *</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength="6"
            pattern="[0-9]{6}"
            required
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
