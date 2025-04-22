import React, { useState } from 'react';
import api from '../api';

const AddUserForm = () => {
  const initialForm = {
    name: '', dob: '', gender: '', blood_group: '',
    contact: '', email: '', password: '', address: '',
    city: '', state: '', zip_code: '', role: '',
    medical_conditions: '', last_donation: '', eligible: false
  };

  const [formData, setFormData] = useState(initialForm);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/users', formData);
      alert('User added!');
      setFormData(initialForm);
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  return (
    <div>
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="dob" type="date" value={formData.dob} onChange={handleChange} required />
        <input name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} required />
        <input name="blood_group" placeholder="Blood Group" value={formData.blood_group} onChange={handleChange} required />
        <input name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
        <input name="zip_code" placeholder="Zip Code" value={formData.zip_code} onChange={handleChange} required />
        <input name="role" placeholder="Role" value={formData.role} onChange={handleChange} required />
        <input name="medical_conditions" placeholder="Medical Conditions" value={formData.medical_conditions} onChange={handleChange} />
        <input name="last_donation" type="date" value={formData.last_donation} onChange={handleChange} />
        <label>
          Eligible to donate:
          <input type="checkbox" name="eligible" checked={formData.eligible} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUserForm;
