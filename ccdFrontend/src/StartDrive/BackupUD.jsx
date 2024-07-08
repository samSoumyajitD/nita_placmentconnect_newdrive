import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getJobById } from '../api/api';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

const StudentApplication = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);

  useEffect(() => {
    const fetchJobData = async () => {
      const data = await getJobById(id);
      setJobData(data);
    };
    fetchJobData();
  }, [id]);

  if (!jobData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Student Application</h1>
      
      {jobData.fillfrom && jobData.fillfrom.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Fill From</CardTitle>
          </CardHeader>
          <CardContent>
            {jobData.fillfrom.map((item, index) => (
              <div key={index} className="mb-4">
                <Label htmlFor={item} className="block text-gray-700 mb-2">{item}</Label>
                <Input type="text" name={item} id={item} className="w-full border p-2 rounded" />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {jobData.items && jobData.items.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Single Select</CardTitle>
          </CardHeader>
          <CardContent>
            {jobData.items.map((item, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold mb-2">{item.key}</h3>
                {item.values.map((value, idx) => (
                  <div key={idx} className="flex items-center mb-2">
                    <Checkbox name={item.key} value={value} className="mr-2" />
                    <Label>{value}</Label>
                  </div>
                ))}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

{jobData.mitems && jobData.mitems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Multi Select</CardTitle>
          </CardHeader>
          <CardContent>
            {jobData.mitems.map((item, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold mb-2">{item.key}</h3>
                {item.values.map((value, idx) => (
                  <div key={idx} className="flex items-center mb-2">
                    <Checkbox name={item.key} value={value} className="mr-2" />
                    <Label>{value}</Label>
                  </div>
                ))}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {jobData.roles && jobData.roles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Roles</CardTitle>
          </CardHeader>
          <CardContent>
            {jobData.roles.map((role, index) => (
              <div key={index} className="flex items-center mb-2">
                <Checkbox name="roles" value={role} className="mr-2" />
                <Label>{role}</Label>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentApplication;
