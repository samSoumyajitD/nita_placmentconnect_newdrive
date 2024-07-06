import React, { useState } from 'react';
import Lx from '../lexicalEditor/lx'; // Your LexicalEditor component
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from '@/components/ui/button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { addJob } from '../api/api'; 
const StartNewDrive = () => {
  // States for Company Information and Selection Process
  const [roles, setRoles] = useState([]);//
  const [currentRole, setCurrentRole] = useState('');//
  const [selectionDomCode, setSelectionDomCode] = useState('');//
  const [isSelectionPopupVisible, setIsSelectionPopupVisible] = useState(false);
  const [isSelectionPrePopupVisible, setIsSelectionPrePopupVisible] = useState(false);
  const [company, setCompany] = useState('');//
  const [roleType, setRoleType] = useState('');//
  const [ctc, setCtc] = useState('');//
  const [companyTier, setCompanyTier] = useState('normal'); // Default to 'normal'
  const [cgpa,setCgpa]=useState('')
  const [mini10thMarksRequired,setmini10thMarksRequired]=useState('')
  const [mini12thMarksRequired,setmini12thMarksRequired]=useState('')
  const [noofgapYearsAllowed,setnoofgapYearsAllowed]=useState('')
  const [activeBacklogsAllowed,setactiveBacklogsAllowed]=useState('')
  const [facultyCoordinator,setfacultyCoordinator]=useState('')
  const [studentCoordinator,setstudentCoordinator]=useState('')
  const [gender, setGender] = useState('all');
  const [allowBackloghis,setallowBackloghis] = useState('na')

  // States for Job Description
  const [jobDDomCode, setJobDDomCode] = useState('');
  const [isJobDPopupVisible, setIsJobDPopupVisible] = useState(false);
  const [isJDPrePopupVisible, setIsJDPrePopupVisible] = useState(false);

  // Handlers for Company Information
  const handleRoleAdd = () => {
    if (currentRole) {
      setRoles([...roles, currentRole]);
      setCurrentRole('');
    }
  };

  const handleRoleChange = (e) => {
    setCurrentRole(e.target.value);
  };

  const removeRole = (roleToRemove) => {
    setRoles(roles.filter(role => role !== roleToRemove));
  };

  // Handlers for Selection Process
  const handleExtractSelectionDom = (newDomCode) => {
    setSelectionDomCode(newDomCode);
    setIsSelectionPopupVisible(false); // Close the popup after selection
  };

  const toggleSelectionPopup = () => {
    setIsSelectionPopupVisible(!isSelectionPopupVisible);
  };

  const toggleSelectionPrePopup = () => {
    setIsSelectionPrePopupVisible(!isSelectionPrePopupVisible); // Toggle the preview popup's visibility
  };

  // Handlers for Job Description
  const handleExtractJobDDom = (newDomCode) => {
    setJobDDomCode(newDomCode);
    setIsJobDPopupVisible(false); // Close the popup after selection
  };

  const toggleJobDPopup = () => {
    setIsJobDPopupVisible(!isJobDPopupVisible);
  };

  const toggleJDPrePopup = () => {
    setIsJDPrePopupVisible(!isJDPrePopupVisible); // Toggle the preview popup's visibility
  };
  //eli
  const [branchesAllowed, setBranchesAllowed] = useState([]);
  const [degreesAllowed, setDegreesAllowed] = useState([]);
  const [years, setYears] = useState([]); // State to hold selected years
  const [yearInput, setYearInput] = useState(""); // State to manage the current input

  const branchesList = ['CSE', 'ECE', 'ME', 'CE'];
  const degreesList = ['B.Tech', 'BTMT', 'BSMS', 'MBA'];

  // Handle checkbox changes for branches and degrees
  const handleCheckboxChange = (list, setList, value) => {
    setList(
      list.includes(value)
        ? list.filter(item => item !== value)
        : [...list, value]
    );
  };

  // Function to remove an item from a list
  const removeItem = (list, setList, value) => {
    setList(list.filter(item => item !== value));
  };

  // Function to add a year to the list
  const addYear = () => {
    if (yearInput && !years.includes(yearInput)) {
      setYears([...years, yearInput]);
      setYearInput(""); // Clear the input field after adding
    }
  };

  // Function to remove a year from the list
  const removeYear = (yearToRemove) => {
    setYears(years.filter(year => year !== yearToRemove));
  };

//Coordination Group
const [postDate, setPostDate] = useState(new Date());
const [deadlineDateTime, setDeadlineDateTime] = useState(null);

const handleDeadlineChange = (datetime) => {
  setDeadlineDateTime(datetime);
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
////EXTRA INFO
const [showExtraInfo, setShowExtraInfo] = useState(false);
const [arrowRotation, setArrowRotation] = useState(false);
const [fillfrom, setfillfrom] = useState([]); // State to hold selected years
const [fillInput, setfillInput] = useState(""); // State to manage the current input
const toggleExtraInfo = () => {
  setShowExtraInfo(!showExtraInfo);
  setArrowRotation(!arrowRotation); // Toggle arrow rotation
};
const addfillform = () => {
  if (fillInput && !fillfrom.includes(fillInput)) {
    setfillfrom([...fillfrom, fillInput]);
    setfillInput(""); // Clear the input field after adding
  }
};

// Function to remove a year from the list
const removefillform= (infoToRemove) => {
  setfillfrom(fillfrom.filter(info => info !== infoToRemove));
};
//mulitiple choice option
const [items, setItems] = useState([]);
const [key, setKey] = useState('');
const [value, setValue] = useState('');
const [tempValues, setTempValues] = useState([]);
const [error, setError] = useState('');

const handleAddValue = () => {
  if (value.trim() === '') {
    setError('Value cannot be empty');
    return;
  }
  setTempValues([...tempValues, value]);
  setValue('');
  setError('');
};

const handleRemoveValue = (indexToRemove) => {
  setTempValues(tempValues.filter((_, index) => index !== indexToRemove));
};

const handleAddItem = () => {
  if (key.trim() === '') {
    setError('Key cannot be empty');
    return;
  }
  if (tempValues.length === 0) {
    setError('Values cannot be empty');
    return;
  }
  setItems([...items, { key, values: tempValues }]);
  setKey('');
  setTempValues([]);
  setError('');
};

const handleRemoveItem = (indexToRemove) => {
  setItems(items.filter((_, index) => index !== indexToRemove));
};
const handleSubmit = async (e) => {
  e.preventDefault();
  const jobData = {
    company,
    roles,
    roleType,
    ctc,
    companyTier,
    cgpa,
    years,
    branchesAllowed,
    degreesAllowed,
    selectionDomCode,
    jobDDomCode,
    gender,
    allowBackloghis,
    mini10thMarksRequired,
mini12thMarksRequired,
noofgapYearsAllowed,
activeBacklogsAllowed,
facultyCoordinator,
studentCoordinator,
deadlineDateTime,
postDate,
fillfrom,
items
  };
//backend 
const resetForm = () => {
  setCompany('');
  setRoles([]);
  setRoleType('');
  setCtc('');
  setCompanyTier('normal');
  setCgpa('');
  setYears([]);
  setBranchesAllowed([]);
  setDegreesAllowed([]);
  setSelectionDomCode('');
  setJobDDomCode('');
  setGender('all');
  setallowBackloghis('na');
  setmini10thMarksRequired('');
  setmini12thMarksRequired('');
  setnoofgapYearsAllowed('');
  setactiveBacklogsAllowed('');
  setfacultyCoordinator('');
  setstudentCoordinator('');
  setDeadlineDateTime(null);
  setPostDate(new Date());
  setfillfrom([]),
  setItems([])
};


  try {
    await addJob(jobData);
    alert('Job added successfully');
    resetForm();
    // Optionally, reset the form here
} catch (error) {
    alert('Error adding job: ' + error);
}

};
  return (
    <form onSubmit={handleSubmit}>
    <div className="max-w-7xl mx-auto p-6 md:p-12 bg-gray-50 shadow-md rounded-lg space-y-10">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-blue-800">Start New DRIVE</h1>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="py-6 px-4 space-y-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Company Information</h2>
       
          {/* Form Section for Company and Role */}
          <div className="flex flex-wrap gap-6">
            {/* Company Input */}
            <div className="w-full md:w-1/2">
              <Label htmlFor="company" className="font-semibold text-gray-800 mb-2">Company</Label>
              <Input
                type="text"
                id="company"
                placeholder="Enter Company Name"
                className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                aria-label="Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            {/* Role Input with Tags and Add Button */}
            <div className="w-full md:w-1/2">
              <Label htmlFor="role" className="font-semibold text-gray-800 mb-2">Roles</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {roles.map((role, index) => (
                  <div key={index} className="bg-gray-200 text-gray-800 px-4 py-1 rounded-full font-semibold flex items-center">
                    {role}
                    <Button onClick={() => removeRole(role)} className="ml-4 rounded-full text-white">x</Button>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  id="role"
                  value={currentRole}
                  onChange={handleRoleChange}
                  placeholder="Enter Role"
                  className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                  aria-label="Role"
                />
                <Button
                 type="button"
                  onClick={handleRoleAdd}
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  aria-label="Add Role"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>

          {/* Form Section for Role Type and CTC */}
          <div className="flex flex-wrap gap-6 mt-6">
            {/* Role Type Input */}
            <div className="w-full md:w-1/2">
              <Label htmlFor="roleType" className="font-semibold text-gray-800 mb-2">Role Type</Label>
              <Input
                type="text"
                id="roleType"
                placeholder="Enter Role Type"
                className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                aria-label="Role Type"
                value={roleType}
            onChange={(e) => setRoleType(e.target.value)}
              />
            </div>

            {/* CTC Input */}
            <div className="w-full md:w-1/2">
              <Label htmlFor="ctc" className="font-semibold text-gray-800 mb-2">CTC</Label>
              <Input
                type="text"
                id="ctc"
                placeholder="Enter CTC"
                className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                aria-label="CTC"
                value={ctc}
                onChange={(e) => setCtc(e.target.value)}
              />
            </div>
          </div>

          {/* Company Tier Radio Group */}
          <div className="mt-6">
  <Label className="font-semibold text-gray-800 mb-2">Company Tier</Label>
  <RadioGroup
        defaultValue="normal"
        className="flex flex-row gap-4"
        onChange={(e) => setCompanyTier(e.target.value)}
      >
        {[
          { value: 'normal', label: 'Normal' },
          { value: 'standard', label: 'Standard' },
          { value: 'dream', label: 'Dream' },
        ].map(({ value, label }) => (
          <div key={value} className="flex items-center space-x-2">
            <RadioGroupItem value={value} id={value} />
            <Label htmlFor={value}>{label}</Label>
          </div>
        ))}
      </RadioGroup>


</div>

        </div>
      </div>
     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="py-6 px-4 space-y-8">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="selectionProcess">Selection Process</Label>
              <Input
                type="text"
                id="selectionProcess"
                placeholder="Selection Process"
                value={selectionDomCode} 
                onChange={(e) => setSelectionDomCode(e.target.value)}
                // Set the value to the extracted DOM content
                readOnly
              />
            </div>
            <div className="flex items-center gap-2">
              <Button  type="button" onClick={toggleSelectionPopup} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Upload 
              </Button>
              <Button  type="button" onClick={toggleSelectionPrePopup} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
                Preview
              </Button>
            </div>

            {/* Selection Process Popup */}
            {isSelectionPopupVisible && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="relative bg-white p-8 rounded shadow-lg max-h-[80vh] overflow-y-auto w-[90vw] md:w-auto">
                  <Button 
                   type="button"
                    onClick={toggleSelectionPopup} 
                    className="absolute top-2 right-2 text-[12px] font-black bg-black h-8 w-8 text-white rounded-full hover:bg-gray-700 transition">
                    ✕
                  </Button>
                  <Lx onExtractDom={handleExtractSelectionDom} />
                </div>
              </div>
            )}

            {/* New Popup (Preview Selection Process) */}
            {isSelectionPrePopupVisible && (
              <div className="fixed inset-0 flex items-center p-6 justify-center bg-black bg-opacity-50 z-50">
                <div className="relative bg-white p-8 rounded shadow-lg max-h-[80vh] overflow-y-auto w-[90vw] md:w-auto">
                  <Button 
                   type="button"
                    onClick={toggleSelectionPrePopup} 
                    className="absolute top-2 right-2 text-[12px] font-black bg-black h-8 w-8 text-white rounded-full hover:bg-gray-700 transition">
                    ✕
                  </Button>
                  <div className="no-tailwindcss-base">
                    {/* Preview content */}
                    <div dangerouslySetInnerHTML={{ __html: selectionDomCode }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Job Description Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="py-6 px-4 space-y-8">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="jobDetails">Job Details and Other Information</Label>
              <Input 
                type="text" 
                id="jobDetails" 
                placeholder="JD" 
                value={jobDDomCode}
                onChange={(e) => setJobDDomCode(e.target.value)}
                 // Set the value to the extracted DOM content
                readOnly
              />
            </div>
            <div className="flex items-center gap-2">
              <Button 
               type="button"
               onClick={toggleJobDPopup} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Upload 
              </Button>
              <Button 
               type="button"
               onClick={toggleJDPrePopup} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
                Preview
              </Button>
            </div>

            {/* Job Description Popup */}
            {isJobDPopupVisible && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="relative bg-white p-8 rounded shadow-lg max-h-[80vh] overflow-y-auto w-[90vw] md:w-auto">
                  <Button 
                   type="button"
                    onClick={toggleJobDPopup} 
                    className="absolute top-2 right-2 text-[12px] font-black bg-black h-8 w-8 text-white rounded-full hover:bg-gray-700 transition">
                    ✕
                  </Button>
                  <Lx onExtractDom={handleExtractJobDDom} />
                </div>
              </div>
            )}

            {/* Additional Popup (Preview Job Description) */}
            {isJDPrePopupVisible && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="relative bg-white p-8 rounded shadow-lg max-h-[80vh] overflow-y-auto w-[90vw] md:w-auto">
                  <Button 
                   type="button"
                    onClick={toggleJDPrePopup} 
                    className="absolute top-2 right-2 text-[12px] font-black bg-black h-8 w-8 text-white rounded-full hover:bg-gray-700 transition">
                    ✕
                  </Button>
                  <div className="no-tailwindcss-base">
                    {/* Preview content */}
                    <div dangerouslySetInnerHTML={{ __html: jobDDomCode }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className=" px-4 space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Eligibility</h2>

      {/* Selection Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Branches Allowed */}
        <div className="flex flex-col min-w-[200px]">
          <h3 className="font-semibold mb-2 text-gray-800">Select Branches Allowed</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {branchesList.map((branch) => (
              <div key={branch} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={branch}
                  checked={branchesAllowed.includes(branch)}
                  onChange={() => handleCheckboxChange(branchesAllowed, setBranchesAllowed, branch)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={branch} className="text-sm font-medium text-gray-700">
                  {branch}
                </label>
              </div>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {branchesAllowed.map((branch) => (
              <div key={branch} className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full shadow-sm">
                <span className="text-sm text-gray-800 font-medium">{branch}</span>
                <Button
                  type="button"
                  onClick={() => removeItem(branchesAllowed, setBranchesAllowed, branch)}
                  className="text-white text-xs rounded-full"
                >
                  &times;
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Degrees Allowed */}
        <div className="flex flex-col min-w-[200px]">
          <h3 className="font-semibold mb-2 text-gray-800">Select Degrees Allowed</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {degreesList.map((degree) => (
              <div key={degree} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={degree}
                  checked={degreesAllowed.includes(degree)}
                  onChange={() => handleCheckboxChange(degreesAllowed, setDegreesAllowed, degree)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={degree} className="text-sm font-medium text-gray-700">
                  {degree}
                </label>
              </div>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {degreesAllowed.map((degree) => (
              <div key={degree} className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full shadow-sm">
                <span className="text-sm text-gray-800 font-medium">{degree}</span>
                <Button
                  type="button"
                  onClick={() => removeItem(degreesAllowed, setDegreesAllowed, degree)}
                  className="text-white text-xs rounded-full"
                >
                  &times;
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Backlog History */}
        <div className="flex flex-col min-w-[200px]">
          <h3 className="font-semibold mb-2 text-gray-800">Backlog History Allowed</h3>
          <RadioGroup defaultValue="na"
           onChange={(e) => setallowBackloghis(e.target.value)}>
  {[
    { value: 'na', label: 'NA' },
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ].map(({ value, label }) => (
    <div key={value} className="flex items-center space-x-2">
      <RadioGroupItem value={value} id={value} />
      <Label htmlFor={value}>{label}</Label>
    </div>
  ))}
</RadioGroup>
        </div>
        <div className="flex flex-col min-w-[200px]">
        <h3 className="font-semibold mb-2 text-gray-800">Gender</h3>
        {/* Gender Allowed */}
        <RadioGroup defaultValue="all"
         onChange={(e) => setGender(e.target.value)}>
  {[
    { value: 'all', label: 'All' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ].map(({ value, label }) => (
    <div key={value} className="flex items-center space-x-2">
      <RadioGroupItem value={value} id={value} />
      <Label htmlFor={value}>{label}</Label>
    </div>
  ))}
</RadioGroup>

</div>
      </div>

      {/* Graduation Year Input and Tags */}
      <div className="mt-6">
        <Label htmlFor="graduationYear" className="font-semibold text-gray-800">Graduation Year</Label>
        <div className="flex flex-wrap gap-2 mt-4">
          {years.map((year) => (
            <div
              key={year}
              className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full shadow-sm"
            >
              <span className="text-sm text-gray-800 font-medium">{year}</span>
              <Button
                type="button"
                onClick={() => removeYear(year)}
                className="text-white text-xs rounded-full"
              >
                &times;
              </Button>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-2 w-full md:w-[500px]">
          <Input
            type="text"
            id="graduationYear"
            placeholder="Enter Graduation Year"
            value={yearInput}
            onChange={(e) => setYearInput(e.target.value)}
            className="flex-1 border-gray-300 rounded-md shadow-sm"
          />
          <Button
            type="button"
            onClick={addYear}
          className="rounded-[20px] text-[10px] font-[600]"
          >
            Add
          </Button>
        </div>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="flex flex-col">
          <Label htmlFor="cgpa" className="font-semibold text-gray-800">CGPA Requirement</Label>
          <Input
            type="text"
            id="cgpa"
            placeholder="Enter CGPA Requirement"
            className="mt-2 border-gray-300 rounded-md shadow-sm"
            value={cgpa}
            onChange={(e) => setCgpa(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="tenthMarks" className="font-semibold text-gray-800">Minimum 10th Marks Requirement</Label>
          <Input
            type="text"
            id="tenthMarks"
            placeholder="Enter 10th Marks Requirement"
            className="mt-2 border-gray-300 rounded-md shadow-sm"
            value={mini10thMarksRequired}
            onChange={(e) => setmini10thMarksRequired(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="twelfthMarks" className="font-semibold text-gray-800">Minimum 12th Marks Requirement</Label>
          <Input
            type="text"
            id="twelfthMarks"
            placeholder="Enter 12th Marks Requirement"
            className="mt-2 border-gray-300 rounded-md shadow-sm"
            value={mini12thMarksRequired}
            onChange={(e) => setmini12thMarksRequired(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="noofgapYearsAllowed" className="font-semibold text-gray-800">Number of Gap Years Allowed</Label>
          <Input
            type="text"
            id="noofgapYearsAllowed"
            placeholder="Enter Number of Gap Years Allowed"
            className="mt-2 border-gray-300 rounded-md shadow-sm"
            value={noofgapYearsAllowed}
            onChange={(e) => setnoofgapYearsAllowed(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="activeBacklogsAllowed" className="font-semibold text-gray-800">Number of Active Backlogs Allowed</Label>
          <Input
            type="text"
            id="activeBacklogsAllowed"
            placeholder="Enter Number of Active Backlogs Allowed"
            className="mt-2 border-gray-300 rounded-md shadow-sm"
            value={activeBacklogsAllowed}
            onChange={(e) => setactiveBacklogsAllowed(e.target.value)}
          />
        </div>
      </div>
    </div>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg">
  
 
      <div className='flex flex-wrap gap-6 py-6 px-4 '>
        <div className="flex flex-col w-full max-w-sm">
          <Label htmlFor="facultyCoordinator" className="mb-2">Faculty Coordinator</Label>
          <Input 
            type="text" 
            id="facultyCoordinator" 
            placeholder="Faculty Coordinator" 
            className="border rounded-lg p-2"
            value={facultyCoordinator}
            onChange={(e) => setfacultyCoordinator(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-full max-w-sm">
          <Label htmlFor="studentCoordinator" className="mb-2">Student Coordinator</Label>
          <Input 
            type="text" 
            id="studentCoordinator" 
            placeholder="Student Coordinator" 
            className="border rounded-lg p-2"
            value={studentCoordinator}
            onChange={(e) => setstudentCoordinator(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col w-full max-w-sm">
          <Label htmlFor="deadline" className="mb-2">Deadline To Apply</Label>
          <Input
            type="datetime-local"
            id="deadline"
            value={deadlineDateTime || ''}
            onChange={(e) => handleDeadlineChange(e.target.value)}
            className="border rounded-lg p-2"
          />
        </div>

        <div className="flex flex-col w-full max-w-sm">
          <Label htmlFor="postDate" className="mb-2">Post Date</Label>
          <Input
            type="text"
            id="postDate"
            placeholder="Post Date"
            value={formatDate(postDate)}
            readOnly
            className="border rounded-lg p-2 bg-gray-100"
          />
        </div>
      </div>
    
      </div>
      <div className="mt-4 bg-white p-8 rounded-lg shadow-lg">
      <div className='flex justify-between items-center'>
        <h2 className="text-2xl font-bold">Take Extra info from candidate</h2>
        <ExpandMoreIcon
          className={`text-gray-600 cursor-pointer transform transition-transform duration-300 ${showExtraInfo ? 'rotate-180' : ''}`}
          onClick={toggleExtraInfo}
          style={{ fontSize: '2rem' }}
        />
      </div>
      {showExtraInfo && (
        <div className="transition-height duration-300 mt-4">
          <div className="mt-6">
        <Label htmlFor="fillfrom" className="font-semibold text-gray-800">Input Form Informations</Label>
        <div className="flex flex-wrap gap-2 mt-4">
          {fillfrom.map((info) => (
            <div
              key={info}
              className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full shadow-sm"
            >
              <span className="text-sm text-gray-800 font-medium">{info}</span>
              <Button
                type="button"
                onClick={() => removefillform(info)}
                className="text-white text-xs rounded-full"
              >
                &times;
              </Button>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-2 w-full md:w-[500px]">
          <Input
            type="text"
            id="graduationYear"
            placeholder="Enter Attribute"
            value={fillInput}
            onChange={(e) => setfillInput(e.target.value)}
            className="flex-1 border-gray-300 rounded-md shadow-sm"
          />
          <Button
            type="button"
            onClick={addfillform}
          className="rounded-[20px] text-[10px] font-[600]"
          >
            Add
          </Button>
        </div>
      </div>
          <div className=" py-5 ">
          <Label htmlFor="choice" className="font-semibold  text-gray-800">Choice Form Informations</Label>
      <div className="flex flex-col my-4 space-y-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="key-input" className="font-semibold  p-2 text-gray-800">Attribute</Label>
          <Input
            id="key-input"
            type="text"
            placeholder="Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="flex-1 w-[50%] border-gray-300 rounded-md shadow-sm"
          />
          {error.includes('Key') && <div className="text-red-500 text-sm">{error}</div>}
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="value-input" className="font-semibold  p-2 text-gray-800">Options</Label>
          <div className="flex space-x-2">
            <Input
              id="value-input"
              type="text"
              placeholder="Value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-[50%]"
            />
            <Button  type="button" onClick={handleAddValue} className="rounded-[20px] text-[10px] font-[600] text-white">
              Add 
            </Button>
          </div>
          {error.includes('Value') && <div className="text-red-500 text-sm">{error}</div>}
        </div>
      </div>
      {tempValues.length > 0 && (
        <div className="mb-4">
          <strong className="block mb-2">Current Values:</strong>
          <div className="flex flex-wrap">
            {tempValues.map((val, index) => (
              <div key={index} className="inline-flex items-center bg-gray-200 px-4 py-2 m-1 rounded-full">
                <span>{val}</span>
                <Button
                 type="button"
                  onClick={() => handleRemoveValue(index)}
                  className="ml-2 text-white text-xs rounded-full hover:text-red-700"
                >
                  &times;
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      <Button  type="button" onClick={handleAddItem} className="w-[200px] text-white">
        Add Item
      </Button>
      {error && <div className="mt-4 text-red-500">{error}</div>}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Items</h2>
        <div className="flex flex-wrap">
          {items.map((item, index) => (
            <div key={index} className="inline-flex items-center bg-gray-200 px-4 py-2 m-1 rounded-full">
              <span className="mr-2 gap-2">{item.key} - {item.values.join(', ')}</span>
              <Button
               type="button"
                onClick={() => handleRemoveItem(index)}
                className="ml-2  text-white text-xs rounded-full hover:text-red-700"
              >
                &times;
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
        </div>
        
      )}
      
    </div>
    <div className="flex items-center justify-center">
  <Button 
    type="submit" 
    className="mt-4 w-[40%] h-[50px] rounded-[10px] p-[20px] text-xl font-medium tracking-wide"
  >
    Submit
  </Button>
</div>


    </div>
    
    </form>
  );
}

export default StartNewDrive;