import React, { useState } from 'react';
import axios from 'axios';

const ReportFoundPage = () => {
  const [form, setForm] = useState({
    itemName: '',
    description: '',
    location: '',
    date: '',
    contactInfo: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      await axios.post('http://localhost:5000/api/items/report', {
        ...form,
        type: 'found',
        userId
      });
      alert('Found item reported successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to report item');
    }
  };

  return (
    <div>
      <h2>Report Found Item</h2>
      <form onSubmit={handleSubmit}>
        <input name="itemName" placeholder="Item Name" onChange={handleChange} required />
        <input name="description" placeholder="Description" onChange={handleChange} />
        <input name="location" placeholder="Found Location" onChange={handleChange} required />
        <input name="date" type="date" onChange={handleChange} required />
        <input name="contactInfo" placeholder="Your Contact Info" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReportFoundPage;
