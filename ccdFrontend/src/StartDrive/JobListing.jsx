import React, { useState, useEffect } from 'react';
import { getAllJobs } from '../api/api'; // Adjust the path as per your project structure
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await getAllJobs();
        setJobs(jobsData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to fetch jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="p-4">
     <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-4xl font-bold text-blue-800">Job Listing</h1>
        </div>
      <div className="grid grid-cols-1 p-8 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map(job => (
          <Card key={job._id} className="w-full max-w-[350px] mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gray-100 p-4 rounded-t-lg">
              <CardTitle className="text-lg font-semibold">{job.company}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-gray-700 mb-2"><strong>Roles:</strong> {job.roles.join(', ')}</p>
              <p className="text-gray-700 mb-2"><strong>Role Type:</strong> {job.roleType}</p>
              <p className="text-gray-700"><strong>Company Tier:</strong> {job.companyTier}</p>
              {/* Add other fields as needed */}
            </CardContent>
            <CardFooter className="flex justify-between p-4">
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">View</Button>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">Apply</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobList;
