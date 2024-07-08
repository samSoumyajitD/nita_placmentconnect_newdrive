// File: src/router.js
import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import JobListing from "../StartDrive/JobListing";
import StartNewdrive from "../StartDrive/StartNewdrive";
import DriveDetails from "../StartDrive/Drivedetails"; // Make sure the import is consistent with the component's name
import Updatedrive from "../StartDrive/Updatedrive";
import Dynamicform from "../StartDrive/Dynamicform";
import Dcsv from "../DownloadCSV/downloadCSV";
import { getJobById } from '../api/api'; // Import the getJobById function from the API module

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, // Default route for this level
        element: <JobListing />, // Component for the default route
      },
      {
        path: 'csv',
        element: <Dcsv />, // Route to start a new drive
      },
      {
        path: 'jobs',
        element: <JobListing />, // Route to list all jobs
      },
      {
        path: 'new-drive',
        element: <StartNewdrive />, // Route to start a new drive
      },
      {
        path: 'job/:id', // Dynamic route for job details
        element: <DriveDetails />,
        loader: async ({ params }) => {
          try {
            // Fetch job data using the getJobById function
            const jobData = await getJobById(params.id);
            return jobData; // Return the fetched data to the component
          } catch (error) {
            console.error('Error loading job data:', error);
            throw error;
          }
        },
      },
      {
        path: 'edit/:id', // Dynamic route for editing company info
        element: <Updatedrive />,
        loader: async ({ params }) => {
          try {
            // Fetch company info using the same function, assuming it matches the route's needs
            const companyInfo = await getJobById(params.id); // Replace this with the appropriate API function if needed
            return companyInfo; // Return the fetched data to the component
          } catch (error) {
            console.error('Error loading company info:', error);
            throw error;
          }
        },
      },
      {
         path: 'application/:id', // Dynamic route for editing company info
        element: <Dynamicform/>,
        loader: async ({ params }) => {
          try {
            // Fetch company info using the same function, assuming it matches the route's needs
            const companyInfo = await getJobById(params.id); // Replace this with the appropriate API function if needed
            return companyInfo; // Return the fetched data to the component
          } catch (error) {
            console.error('Error loading company info:', error);
            throw error;
          }
      },
    }
    ],
  }
]);

export default router;
