import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  campus: string
  universityMail: string
  firstName: string
  surname: string
  mobile1: number
  mobile2: number
  bloodGroup: string
  height: number
  weight: number
  dateOfBirth: Date
  placeOfBirth: string
  religion: string
  careerGoal: string
  caste: string
  corseReason: string
  abcId: string
  hobby: string
  presentAddress: string
  city: string
  area: string
  district: string
  state: string
  postalCode: string
  postOffice: string
  policeStation: string
  aadharNumber: number
  permanentAddress: string
  city2: string
  area2: string
  district2: string
  state2: string
  postalCode2: string
  postOffice2: string
  policeStation2: string
  aadharNumber2: number
  whatsAppNumber: number

  //Qualification Details
  instituteOfClassX: string
  boardOfClassX: string
  yearOfClassXPassing: number
  percentageOfClassX: number
  mediumOfClassX: string


  instituteOfClassXII: string
  boardOfClassXII: string
  yearOfClassXIIPassing: number
  percentageOfClassXII: number
  mediumOfClassXII: string

  instituteOfGraduation: string
  boardOfGraduation: string
  yearOfGraduationPassing: number
  percentageOfGraduation: number
  mediumOfGraduation: string

  //Guardian Details
  guardian: string
  fatherName: string
  fatherOccupation: string
  fatherMobile: number
  fatherEmail: string
  motherName: string
  motherOccupation: string
  motherMobile: number
  motherEmail: string

  noOfBrothers: number
  noOfSisters: number


  //Local Guardian Details
  localGuardianName: string
  localGuardianOccupation: string
  localGuardianMobile: number
  localGuardianEmail: string
}

const StudentProfile: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    campus: '',
    universityMail: '',
    firstName: '',
    surname: '',
    mobile1: 0,
    mobile2: 0,
    bloodGroup: '',
    height: 0,
    weight: 0,
    dateOfBirth: new Date(),
    placeOfBirth: '',
    religion: '',
    careerGoal: '',
    caste: '',
    corseReason: '',
    abcId: '',
    hobby: '',
    presentAddress: '',
    city: '',
    area: '',
    district: '',
    state: '',
    postalCode: '',
    postOffice: '',
    policeStation: '',
    aadharNumber: 0,  
    permanentAddress: '',
    city2: '',
    area2: '',
    district2: '',
    state2: '',
    postalCode2: '',
    postOffice2: '',
    policeStation2: '',
    aadharNumber2: 0,
    whatsAppNumber: 0,
    instituteOfClassX: '',
    boardOfClassX: '',
    yearOfClassXPassing: 0,
    percentageOfClassX: 0,
    mediumOfClassX: '',
    instituteOfClassXII: '',
    boardOfClassXII: '',
    yearOfClassXIIPassing: 0,
    percentageOfClassXII: 0,
    mediumOfClassXII: '',
    instituteOfGraduation: '',
    boardOfGraduation: '',
    yearOfGraduationPassing: 0,
    percentageOfGraduation: 0,
    mediumOfGraduation: '',
    guardian: '',
    fatherName: '',
    fatherOccupation: '',
    fatherMobile: 0,
    fatherEmail: '',
    motherName: '',
    motherOccupation: '',
    motherMobile: 0,
    motherEmail: '',
    noOfBrothers: 0,
    noOfSisters: 0,
    localGuardianName: '',
    localGuardianOccupation: '',
    localGuardianMobile: 0,
    localGuardianEmail: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    // This would be where the data gets sent to the backend
    fetch('/api/v1/profile/student-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(() => {
        alert('Profile saved successfully!');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Student Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Campus</label>
            <input
              type="text"
              name="campus"
              value={formData.campus}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">University Mail-ID</label>
            <input
              type="email"
              name="universityMail"
              value={formData.universityMail}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              readOnly
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Surname</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth.toISOString().split('T')[0]}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile 1</label>
            <input
              type="text"
              name="mobile1"
              value={formData.mobile1}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Add other fields as needed */}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>
    </div>
  );
};

export default StudentProfile;
