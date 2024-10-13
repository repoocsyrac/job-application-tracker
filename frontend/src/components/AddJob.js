import React, { useState } from 'react';
import api from '../api/axios';

const AddJob = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('To Apply');

  const [applicationLink, setApplicationLink] = useState('');
  const [closingDate, setClosingDate] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobTitle || !companyName) {
      alert('Please fill out all required fields');
      return;
    }
    try {
      await api.post('/api/jobs/add', {
        companyName,
        jobTitle,
        applicationLink,
        location,
        closingDate,
        status
      });
      window.location.reload();
    } catch (error) {
      console.error('Error adding job:', error.response ? error.response.data : error.message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Job Title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Website"
        value={applicationLink}
        onChange={(e) => setApplicationLink(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="text"
        placeholder="Closing Date"
        value={closingDate}
        onChange={(e) => setClosingDate(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="To Apply">To Apply</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Rejected">Rejected</option>
      </select>
      <button type="submit">Add Job</button>
    </form>
  );
};

export default AddJob;