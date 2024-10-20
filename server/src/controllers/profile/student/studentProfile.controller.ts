import { Request, Response } from 'express';
import prisma from '../../../database/prisma';


interface saveStudentProfile {
  campus: String
  universityMail: String
  firstName: String
  surname: String
  mobile1: Number
  mobile2: Number
  bloodGroup: String
  height: Number
  weight: Number
  dateOfBirth: Date
  placeOfBirth: String
  religion: String
  careerGoal: String
  caste: String
  corseReason: String
  abcId: String
  hobby: String
  presentAddress: String
  city: String
  area: String
  district: String
  state: String
  postalCode: String
  postOffice: String
  policeStation: String
  aadharNumber: Number
  permanentAddress: String
  city2: String
  area2: String
  district2: String
  state2: String
  postalCode2: String
  postOffice2: String
  policeStation2: String
  aadharNumber2: Number
  whatsAppNumber: Number

  //Qualification Details
  instituteOfClassX: String
  boardOfClassX: String
  yearOfClassXPassing: Number
  percentageOfClassX: Number
  mediumOfClassX: String


  instituteOfClassXII: String
  boardOfClassXII: String
  yearOfClassXIIPassing: Number
  percentageOfClassXII: Number
  mediumOfClassXII: String

  instituteOfGraduation: String
  boardOfGraduation: String
  yearOfGraduationPassing: Number
  percentageOfGraduation: Number
  mediumOfGraduation: String

  //Guardian Details
  guardian: String
  fatherName: String
  fatherOccupation: String
  fatherMobile: Number
  fatherEmail: String
  motherName: String
  motherOccupation: String
  motherMobile: Number
  motherEmail: String

  noOfBrothers: Number
  noOfSisters: Number


  //Local Guardian Details
  localGuardianName: String
  localGuardianOccupation: String
  localGuardianMobile: Number
  localGuardianEmail: String

}


export const saveStudentProfile = async (req: Request, res: Response) => {
  try {
    const { studentAuthId } = req.params;
    console.log(studentAuthId);

    // Validate the incoming request body
    // const { studentAuthId, campus, universityMail, firstName, surname } = req.body;

    // if (!studentAuthId || !campus || !universityMail || !firstName || !surname) {
    //   return res.status(400).json({ error: 'Missing required fields' });
    // }

    // Ensure the student exists
    const student = await prisma.studentAuth.findUnique({
      where: { studentAuthId: studentAuthId }, // Check if StudentAuth exists by studentAuthId
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const { 
      campus, 
      universityMail, 
      firstName, 
      surname, 
      mobile1,
      mobile2,
      bloodGroup,
      height,
      weight,
      dateOfBirth,
      placeOfBirth,
      religion,
      careerGoal,
      caste,
      corseReason,
      abcId,
      hobby,
      presentAddress,
      city,
      area,
      district,
      state,
      postalCode,
      postOffice,
      policeStation,
      aadharNumber,
      permanentAddress,
      city2,
      area2,
      district2,
      state2,
      postalCode2,
      postOffice2,
      policeStation2,
      aadharNumber2,
      whatsAppNumber,


      //Qualification Details
      instituteOfClassX,
      boardOfClassX,
      yearOfClassXPassing,
      percentageOfClassX,
      mediumOfClassX,
      instituteOfClassXII,
      boardOfClassXII,
      yearOfClassXIIPassing,
      percentageOfClassXII,
      mediumOfClassXII,
      instituteOfGraduation,
      boardOfGraduation,
      yearOfGraduationPassing,
      percentageOfGraduation,
      mediumOfGraduation,

      //Guardian Details
      guardian,
      fatherName,
      fatherOccupation,
      fatherMobile,
      fatherEmail,
      motherName,
      motherOccupation,
      motherMobile,
      motherEmail,

      noOfBrothers,
      noOfSisters,

      //Local Guardian Details
      localGuardianName,
      localGuardianOccupation,
      localGuardianMobile,
      localGuardianEmail
    } = req.body;

    // Create the student profile with reference to the studentAuthId
    const studentProfile = await prisma.studentProfile.create({
      data: {
        ...(req.params as { studentAuthId: string }),                                                                                                                 // Reference studentAuthId
        campus,
        universityMail,
        firstName,
        surname,
        mobile1,
        mobile2,
        bloodGroup,
        height,
        weight,
        dateOfBirth,
        placeOfBirth,
        religion,
        careerGoal,
        caste,
        corseReason,
        abcId,
        hobby,
        presentAddress,
        city,
        area,
        district,
        state,
        postalCode,
        postOffice,
        policeStation,
        aadharNumber,
        permanentAddress,
        city2,
        area2,
        district2,
        state2,
        postalCode2,
        postOffice2,
        policeStation2,
        aadharNumber2,
        whatsAppNumber,

        //Qualification Details
        instituteOfClassX,
        boardOfClassX,
        yearOfClassXPassing,
        percentageOfClassX,
        mediumOfClassX,
        instituteOfClassXII,
        boardOfClassXII,
        yearOfClassXIIPassing,
        percentageOfClassXII,
        mediumOfClassXII, 
        instituteOfGraduation,
        boardOfGraduation,  
        yearOfGraduationPassing,
        percentageOfGraduation,
        mediumOfGraduation,

        //Guardian Details
        guardian,
        fatherName,
        fatherOccupation,
        fatherMobile,
        fatherEmail,
        motherName,
        motherOccupation,
        motherMobile,
        motherEmail,

        noOfBrothers,
        noOfSisters,

        //Local Guardian Details
        localGuardianName,
        localGuardianOccupation,
        localGuardianMobile,
        localGuardianEmail  
      },
    });

    return res
    .status(200)
    .json(
      { 
        message: 'Profile saved successfully!', 
        studentProfile 
      }
    );
  } catch (error) {
    console.error('Error saving profile:', error);
    return res.status(500).json({ error: 'Failed to save profile.' });
  }
};
