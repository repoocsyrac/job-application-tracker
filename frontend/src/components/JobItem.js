import React from 'react';
import api from '../api/axios';

const JobItem = ({ job }) => {
  const handleDelete = async () => {
    try {
      await api.delete(`/jobs/${job.id}`);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <li>
      <h2>{job.jobTitle}</h2>
      <p>{job.companyName}</p>
      <p>{job.location}</p>
      <p>{job.status}</p>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default JobItem;