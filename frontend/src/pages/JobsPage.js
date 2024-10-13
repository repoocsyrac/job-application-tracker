import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Container, Typography, Link, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
//import AddCircleIcon from '@mui/icons-material/AddCircle';
import api from '../api/axios';
import AddJob from '../components/AddJob';
import { AddCircle as AddCircleIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const JobsPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [showAddJob, setShowAddJob] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/api/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleEdit = (jobId) => {
    // TODO: Handle job editiing
    console.log(`Edit job with ID: ${jobId}`);
  };

  const handleDelete = async (jobId) => {
    try {
      await api.delete(`/api/jobs/${jobId}`);
      setJobs(jobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" mt={5}>
        Your Job Applications
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
      <IconButton color="primary" onClick={() => setShowAddJob(!showAddJob)}>
        <AddCircleIcon fontSize="large" />
      </IconButton>
      {showAddJob && <AddJob />}
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell>Job Role</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Closing Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.companyName}</TableCell>
                <TableCell>{job.jobTitle}</TableCell>
                <TableCell>
                  <Link href={job.applicationLink} target="_blank" rel="noopener">
                    {job.applicationLink}
                  </Link>
                </TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.closingDate}</TableCell>
                <TableCell>{job.status}</TableCell>
                <TableCell>
                <IconButton color="primary" onClick={() => handleEdit(job.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(job.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default JobsPage;