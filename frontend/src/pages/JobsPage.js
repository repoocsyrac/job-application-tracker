import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import api from '../api/axios';
import AddJob from '../components/AddJob';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [showAddJob, setShowAddJob] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" mt={5}>
        Your Job Applications
      </Typography>
      <IconButton color="primary" onClick={() => setShowAddJob(!showAddJob)}>
        <AddCircleIcon fontSize="large" />
      </IconButton>
      {showAddJob && <AddJob />}
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job Title</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.jobTitle}</TableCell>
                <TableCell>{job.companyName}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.status}</TableCell>
                <TableCell>
                  {/* Edit and Delete Buttons Here */}
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