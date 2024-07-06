import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJobById } from '../api/api';
import {
  CircularProgress,
  Grid,
  Typography,
  Container,
  Paper,
  Box,
  Divider,
  IconButton
} from '@mui/material';
import {
  ErrorOutline,
  CheckCircle,
  Work,
  School,
  DateRange,
  AccessTime
} from '@mui/icons-material';

const DriveDetails = () => {
  const { id } = useParams(); // Get the job ID from the URL parameters
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobData = await getJobById(id);
        setJob(jobData);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch job data');
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const sanitizeHtml = (html) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Remove the contenteditable attribute from all elements
    const editableElements = tempDiv.querySelectorAll('[contenteditable="true"]');
    editableElements.forEach(element => {
      element.removeAttribute('contenteditable');
    });

    return tempDiv.innerHTML;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" color="red">
        <ErrorOutline style={{ marginRight: 8 }} />
        {error}
      </Box>
    );
  }

  // Sanitize selectionDomCode and jobDDomCode
  const sanitizedSelectionDomCode = sanitizeHtml(job.selectionDomCode);
  const sanitizedJobDDomCode = sanitizeHtml(job.jobDDomCode);

  return (
    <div>
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-blue-800"> {job.company}</h1>
      </div>
    <Container maxWidth="md">
   
      <Paper elevation={3} style={{ padding: '24px', marginTop: '24px' }}>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" mb={2}>
              <Work style={{ marginRight: 8 }} />
              <Typography variant="body1">
                <strong>Roles:</strong> {job.roles.join(', ')}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <CheckCircle style={{ marginRight: 8 }} />
              <Typography variant="body1">
                <strong>Role Type:</strong> {job.roleType}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <CheckCircle style={{ marginRight: 8 }} />
              <Typography variant="body1">
                <strong>CTC:</strong> {job.ctc}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <CheckCircle style={{ marginRight: 8 }} />
              <Typography variant="body1">
                <strong>Company Tier:</strong> {job.companyTier}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <School style={{ marginRight: 8 }} />
              <Typography variant="body1">
                <strong>CGPA:</strong> {job.cgpa}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <CheckCircle style={{ marginRight: 8 }} />
              <Typography variant="body1">
                <strong>Years:</strong> {job.years.join(', ')}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <CheckCircle style={{ marginRight: 8 }} />
              <Typography variant="body1">
                <strong>Branches Allowed:</strong> {job.branchesAllowed.join(', ')}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <CheckCircle style={{ marginRight: 8 }} />
              <Typography variant="body1">
                <strong>Degrees Allowed:</strong> {job.degreesAllowed.join(', ')}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" mb={2}>
              <CheckCircle style={{ marginRight: 8 }} />
              <Typography variant="body1">
                <strong>Gender:</strong> {job.gender}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <CheckCircle style={{ marginRight: 8 }} />
              <Typography variant="body1">
                <strong>Allow Backlog:</strong> {job.allowBacklog}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <CheckCircle style={{ marginRight: 8 }} />
              <Typography variant="body1">
                <strong>Minimum 10th Marks Required:</strong> {job.mini10thMarksRequired}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <CheckCircle style={{ marginRight: 8 }} />
              <Typography variant="body1">
                <strong>Minimum 12th Marks Required:</strong> {job.mini12thMarksRequired}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <CheckCircle style={{ marginRight: 8 }} />
              <Typography variant="body1">
                <strong>No of Gap Years Allowed:</strong> {job.noofgapYearsAllowed}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <CheckCircle style={{ marginRight: 8 }} />
              <Typography variant="body1">
                <strong>Active Backlogs Allowed:</strong> {job.activeBacklogsAllowed}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <CheckCircle style={{ marginRight: 8 }} />
              <Typography variant="body1">
                <strong>Faculty Coordinator:</strong> {job.facultyCoordinator}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <CheckCircle style={{ marginRight: 8 }} />
              <Typography variant="body1">
                <strong>Student Coordinator:</strong> {job.studentCoordinator}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Divider style={{ margin: '24px 0' }} />
        <div className='no-tailwindcss-base'>
        <Box mb={4}>
          <Typography variant="h3" gutterBottom>
            Selection Details
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: sanitizedSelectionDomCode }} />
        </Box>
        </div>
        <div className="no-tailwindcss-base">
        <Box>
          <Typography variant="h3" gutterBottom>
            Job Description
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: sanitizedJobDDomCode }} />
        </Box>
        </div>
        <Divider style={{ margin: '24px 0' }} />
        <Box display="flex" alignItems="center" mb={2}>
          <DateRange style={{ marginRight: 8 }} />
          <Typography variant="body1">
            <strong>Deadline Date and Time:</strong> {new Date(job.deadlineDateTime).toLocaleString()}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <DateRange style={{ marginRight: 8 }} />
          <Typography variant="body1">
            <strong>Post Date:</strong> {new Date(job.postDate).toLocaleDateString()}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <AccessTime style={{ marginRight: 8 }} />
          <Typography variant="body1">
            <strong>Post Time:</strong> {job.postTime}
          </Typography>
        </Box>
       
      </Paper>
    </Container>
    </div>
  );
};

export default DriveDetails;
