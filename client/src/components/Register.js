import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [agencies, setAgencies] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    userType: '',
    hobbies: [],
    agencyId: ''
  });
  const [files, setFiles] = useState({
    profileImage: null,
    resume: null
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAgencies();
  }, []);

  const fetchAgencies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/agencies');
      setAgencies(response.data);
    } catch (err) {
      console.error('Failed to fetch agencies');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        hobbies: checked 
          ? [...prev.hobbies, value]
          : prev.hobbies.filter(h => h !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setFiles(prev => ({ ...prev, [e.target.name]: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'hobbies') {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      });

      if (files.profileImage) data.append('profileImage', files.profileImage);
      if (files.resume) data.append('resume', files.resume);

      const response = await axios.post('http://localhost:5000/api/auth/register', data);
      
      localStorage.setItem('tempUserId', response.data.userId);
      navigate('/verify-otp');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]+"
            required
          />
        </div>

        <div className="form-group">
          <label>Gender *</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleChange}
                required
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === 'Other'}
                onChange={handleChange}
              />
              Other
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>User Type *</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            required
          >
            <option value="">Select User Type</option>
            <option value="Job Seeker">Job Seeker</option>
            <option value="Agency">Agency</option>
          </select>
        </div>

        <div className="form-group">
          <label>Hobbies</label>
          <div className="checkbox-group">
            {['Sports', 'Dance', 'Reading', 'Singing'].map(hobby => (
              <label key={hobby}>
                <input
                  type="checkbox"
                  value={hobby}
                  checked={formData.hobbies.includes(hobby)}
                  onChange={handleChange}
                />
                {hobby}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Profile Image (PNG/JPEG only)</label>
          <input
            type="file"
            name="profileImage"
            accept=".png,.jpg,.jpeg"
            onChange={handleFileChange}
          />
        </div>

        {formData.userType === 'Job Seeker' && (
          <>
            <div className="form-group">
              <label>Resume (PDF/DOCX only)</label>
              <input
                type="file"
                name="resume"
                accept=".pdf,.docx"
                onChange={handleFileChange}
              />
            </div>

            <div className="form-group">
              <label>Select Agency *</label>
              <select
                name="agencyId"
                value={formData.agencyId}
                onChange={handleChange}
                required
              >
                <option value="">Select Agency</option>
                {agencies.map(agency => (
                  <option key={agency.id} value={agency.id}>
                    {agency.first_name} {agency.last_name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {error && <div className="error">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>

        <div className="link" onClick={() => navigate('/login')}>
          Already have an account? Login
        </div>
      </form>
    </div>
  );
};

export default Register;
