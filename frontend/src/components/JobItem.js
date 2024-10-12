import React, { useState } from 'react';
import api from '../api/axios';
import EditJob from './EditJob';

const JobItem = ({ job, onJobUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    try {
      await api.delete(`/jobs/${job.id}`);
      onJobUpdated();  // Refresh job list
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    onJobUpdated();
  };

  return (
    <li>
      {isEditing ? (
        <EditJob job={job} onSave={handleSave} onCancel={() => setIsEditing(false)} />
      ) : (
        <>
          <h2>{job.jobTitle}</h2>
          <p>{job.companyName}</p>
          <p>{job.location}</p>
          <p>{job.status}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </li>
  );
};

export default JobItem;