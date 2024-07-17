import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJobById } from '../api/api';

function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function BriefcaseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default function Component() {
  const { id } = useParams();
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

    if (id) fetchJob();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BriefcaseIcon className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Job Details</h1>
        </div>
        <Link
          to="#"
          className="inline-flex items-center gap-2 rounded-md bg-primary-foreground px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Apply Now
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </header>
      <main className="flex-1 py-8 px-6 md:px-12 lg:px-16 grid gap-8">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              
              <div>
                <h2 className="text-2xl font-bold">{job.company}</h2>
                <p className="text-muted-foreground">{job.roles.join(', ')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-muted px-3 py-1 rounded-md text-sm font-medium">{job.roleType}</div>
              <div className="bg-muted px-3 py-1 rounded-md text-sm font-medium">{job.ctc}</div>
            </div>
          </div>
          <div className="grid gap-1">
            <h3 className="text-lg font-semibold"></h3>
            <p className="text-muted-foreground">{job.jobDDomCode}</p>
          </div>
        </div>
    
         
      </main>
      <footer className="bg-muted py-4 px-6 flex items-center justify-between">
        <p className="text-muted-foreground text-sm">&copy; 2024 Acme Inc. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link to="#" className="text-muted-foreground hover:underline text-sm">
            Privacy Policy
          </Link>
          <Link to="#" className="text-muted-foreground hover:underline text-sm">
            Terms of Service
          </Link>
        </div>
      </footer>
    </div>
  );
}
