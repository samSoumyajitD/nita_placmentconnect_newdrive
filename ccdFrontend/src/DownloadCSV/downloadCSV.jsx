// src/components/JobList.js

import React, { useState } from 'react';
import { downloadCSV } from '../api/api';
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
const Dcsv = () => {
  // Other code...

  const [selectedAttributes, setSelectedAttributes] = useState([]);

  const handleAttributeChange = (e) => {
    const value = e.target.value;
    setSelectedAttributes(prevState =>
      prevState.includes(value)
        ? prevState.filter(attr => attr !== value)
        : [...prevState, value]
    );
  };

  const handleDownloadCSV = async () => {
    try {
      await downloadCSV(selectedAttributes);
    } catch (error) {
      console.error('Failed to download CSV:', error);
    }
  };

  return (
    <div>
         <section className="w-full mt-10  md:py-24 lg:py-20">
      <div className="container grid items-center justify-center gap-8 px-4 text-center md:px-6">
        <div className="space-y-4 py-4 ">
          
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Download Student Data</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Access and download comprehensive student information, including academic records, contact details, and
            more.
          </p>
        </div>
     
      </div>
      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Select Attributes
        </h2>
    
        <div className="bg-white shadow rounded-lg mx-10 px-10 py-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    
    
    <div className="flex items-center space-x-2">
      <label htmlFor="attribute-2" className="flex items-center space-x-2">
        <input
          type="checkbox"
          value="company"
          onChange={handleAttributeChange}
          className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
        />
        <span className="text-gray-700 font-semibold">Company</span>
      </label>
    </div>
    
    <div className="flex items-center space-x-2">
      <label htmlFor="attribute-3" className="flex items-center space-x-2">
        <input
          type="checkbox"
          value="roles"
          onChange={handleAttributeChange}
          className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
        />
        <span className="text-gray-700 font-semibold">Roles</span>
      </label>
    </div>
    
    <div className="flex items-center space-x-2">
      <label htmlFor="attribute-4" className="flex items-center space-x-2">
        <input
          type="checkbox"
          value="companyTier"
          onChange={handleAttributeChange}
          className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
        />
        <span className="text-gray-700 font-semibold">Company Tier</span>
      </label>
    </div>
    
    <div className="flex items-center space-x-2">
      <label htmlFor="attribute-5" className="flex items-center space-x-2">
        <input
          type="checkbox"
          value="mini10thMarksRequired"
          onChange={handleAttributeChange}
          className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
        />
        <span className="text-gray-700 font-semibold">10th Marks Required</span>
      </label>
    </div>
    
    <div className="flex items-center space-x-2">
      <label htmlFor="attribute-6" className="flex items-center space-x-2">
        <input
          type="checkbox"
          value="mini12thMarksRequired"
          onChange={handleAttributeChange}
          className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
        />
        <span className="text-gray-700 font-semibold">12th Marks Required</span>
      </label>
    </div>
    
    <div className="flex items-center space-x-2">
      <label htmlFor="attribute-7" className="flex items-center space-x-2">
        <input
          type="checkbox"
          value="cgpa"
          onChange={handleAttributeChange}
          className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
        />
        <span className="text-gray-700 font-semibold">CGPA</span>
      </label>
    </div>
    
    <div className="flex items-center space-x-2">
      <label htmlFor="attribute-8" className="flex items-center space-x-2">
        <input
          type="checkbox"
          value="branchesAllowed"
          onChange={handleAttributeChange}
          className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
        />
        <span className="text-gray-700 font-semibold">Branches Allowed</span>
      </label>
    </div>
    
    <div className="flex items-center space-x-2">
      <label htmlFor="attribute-9" className="flex items-center space-x-2">
        <input
          type="checkbox"
          value="degreesAllowed"
          onChange={handleAttributeChange}
          className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
        />
        <span className="text-gray-700 font-semibold">Degrees Allowed</span>
      </label>
    </div>
    
    <div className="flex items-center space-x-2">
      <label htmlFor="attribute-10" className="flex items-center space-x-2">
        <input
          type="checkbox"
          value="graduationYearsAllowed"
          onChange={handleAttributeChange}
          className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
        />
        <span className="text-gray-700 font-semibold">Graduation Years Allowed</span>
      </label>
    </div>
    
    <div className="flex items-center space-x-2">
      <label htmlFor="attribute-11" className="flex items-center space-x-2">
        <input
          type="checkbox"
          value="noofgapYearsAllowed"
          onChange={handleAttributeChange}
          className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
        />
        <span className="text-gray-700 font-semibold">Number of Gap Years Allowed</span>
      </label>
    </div>
    
    <div className="flex items-center space-x-2">
      <label htmlFor="attribute-12" className="flex items-center space-x-2">
        <input
          type="checkbox"
          value="allowBackloghis"
          onChange={handleAttributeChange}
          className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
        />
        <span className="text-gray-700 font-semibold">Allow Backlog History</span>
      </label>
    </div>
    
  </div>
</div>

    </section>

    <div className="container mx-auto mt-4 text-center">
        <Button onClick={handleDownloadCSV} className="inline-flex items-center px-6 py-3 text-white font-medium rounded-md ">
          <DownloadIcon className="mr-2 h-5 w-5" />
          Download 
        </Button>
      </div>
  
    </div>
  );
};
function DownloadIcon(props) {
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
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
      </svg>
    )
  }
export default Dcsv;
