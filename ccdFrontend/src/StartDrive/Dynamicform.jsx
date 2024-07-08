import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getJobById } from '../api/api';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

const Dynamicform= () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const [singleSelect, setSingleSelect] = useState({});
  const [multiSelect, setMultiSelect] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const data = await getJobById(id);
        setJobData(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch job data');
        setLoading(false);
      }
    };
    fetchJobData();
  }, [id]);

  const handleSingleSelectChange = (itemKey, value) => {
    setSingleSelect({ ...singleSelect, [itemKey]: value });
  };

  const handleMultiSelectChange = (itemKey, value) => {
    if (multiSelect[itemKey] && multiSelect[itemKey].includes(value)) {
      // Deselect value
      setMultiSelect({
        ...multiSelect,
        [itemKey]: multiSelect[itemKey].filter((v) => v !== value),
      });
    } else {
      // Select value
      setMultiSelect({
        ...multiSelect,
        [itemKey]: [...(multiSelect[itemKey] || []), value],
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Loading...</div>
        <style>{`
          .loader {
            border: 4px solid rgba(0, 0, 0, 0.1);
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border-left-color: #09f;
            animation: spin 1s ease infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Student Application</h1>

      {jobData.roles && jobData.roles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {jobData.roles.map((role, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`role-${role}`}
                    name="roles"
                    value={role}
                    className="mr-2"
                    aria-label={`Role ${role}`}
                  />
                  <Label htmlFor={`role-${role}`}>{role}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {jobData.fillfrom && jobData.fillfrom.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Fill From</CardTitle>
          </CardHeader>
          <CardContent>
            {jobData.fillfrom.map((item, index) => (
              <div key={index} className="mb-4">
                <Label htmlFor={item} className="block text-gray-700 mb-2">
                  {item}
                </Label>
                <Input
                  type="text"
                  name={item}
                  id={item}
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={`Fill ${item}`}
                />
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {item.values.map((value, idx) => (
                    <div key={idx} className="flex items-center mb-2">
                      <input
                        type="radio"
                        id={`${item.key}-${value}`}
                        name={item.key}
                        value={value}
                        checked={singleSelect[item.key] === value}
                        onChange={() => handleSingleSelectChange(item.key, value)}
                        className="mr-2"
                        aria-label={`Select ${value} for ${item.key}`}
                      />
                      <Label htmlFor={`${item.key}-${value}`}>{value}</Label>
                    </div>
                  ))}
                </div>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {item.values.map((value, idx) => (
                    <div key={idx} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`${item.key}-${value}`}
                        name={item.key}
                        value={value}
                        checked={multiSelect[item.key] && multiSelect[item.key].includes(value)}
                        onChange={() => handleMultiSelectChange(item.key, value)}
                        className="mr-2"
                        aria-label={`Select ${value} for ${item.key}`}
                      />
                      <Label htmlFor={`${item.key}-${value}`}>{value}</Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dynamicform;
