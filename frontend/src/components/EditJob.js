import React, { useState } from 'react';
import api from '../api/axios';

const EditJob = ({ job, onCancel, onSave }) => {
  const [jobTitle, setJobTitle] = useState(job.jobTitle);
  const [companyName, setCompanyName] = useState(job.companyName);
  const [location, setLocation] = useState(job.location);
  const [status, setStatus] = useState(job.status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobTitle || !companyName) {
        alert('Please fill out all required fields');
        return;
    }
    try {
      await api.put(`/jobs/${job.id}`, {
        jobTitle,
        companyName,
        location,
        status
      });
      onSave();  // Trigger refresh or update the job list after save
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Job Title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="To Apply">To Apply</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Rejected">Rejected</option>
      </select>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditJob;