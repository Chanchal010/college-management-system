import { Request, Response, NextFunction } from 'express'
import prisma from '../../../database/prisma'
import bcryptjs from 'bcryptjs'
import ApiError from '../../../utilities/ApiError'
import ApiResponse from '../../../utilities/ApiResponse'
import jwt from 'jsonwebtoken'
import Joi from 'joi'

let expiryDate = new Date(Date.now() + 3600000) // 1 hour
let options = {
  httpOnly: true,
  secure: true,
  expires: expiryDate,
};

const registerStudentSchema = Joi.object({
  fullName: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
  gender: Joi.string().required(),
  universityRegNo: Joi.string()
    .pattern(/^0\d{2}-\d{3}-20\d{2}-\d{3}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Registration number must follow the format 00X-XXX-20XX-XXX",
    }),
});



export const registerStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate the request body using Joi
    const { error, value } = registerStudentSchema.validate(req.body);

    if (error) {
      throw new ApiError(400, error.details[0].message);
    }

    const { fullName, password, gender, universityRegNo } = value;

    // Check if the student already exists
    const existedStudent = await prisma.studentAuth.findUnique({
      where: {
        universityRegNo,
      },
    });

    if (existedStudent) {
      throw new ApiError(400, "Student already exists");
    }

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create the new student in the database
    const newStudent = await prisma.studentAuth.create({
      data: {
        fullName,
        password: hashedPassword,
        gender,
        universityRegNo,
      },
    });

    if (!newStudent) {
      throw new ApiError(400, "Something went wrong while registering student");
    }

    // Retrieve the created student's details
    const createdStudent = await prisma.studentAuth.findUnique({
      where: { studentAuthId: newStudent.studentAuthId },
      select: {
        fullName: true,
        gender: true,
        universityRegNo: true,
      },
    });

    if (!createdStudent) {
      throw new ApiError(400, "Something went wrong being registering student");
    }

    // Respond with success
    res.status(201).json(
      new ApiResponse(
        201,
        createdStudent,
        "Student registered successfully",
        true
      )
    );
  } catch (error: any) {
    next(error);
  }
};

export const logInStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { universityRegNo, password } = req.body

    if (!(universityRegNo && password)) {
      throw new ApiError(400, 'Check your credentials properly')
    }

    const student = await prisma.studentAuth.findUnique({
      where: {
        universityRegNo,
      },
    })

    if (!student) {
      throw new ApiError(400, "can't find any Student with this roll number")
    }

    const validPassword = bcryptjs.compareSync(password, student.password)

    if (!validPassword) {
      throw new ApiError(400, 'invalid password')
    }

    const token = jwt.sign(
      { id: student.studentAuthId },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h',
      },
    )

    const loggedInStudent = await prisma.studentAuth.findUnique({
      where: {
        studentAuthId: student.studentAuthId,
      },
      select: {
        studentAuthId: true,
        universityRegNo: true,
        gender: true,
      },
    })

    res
      .status(200)
      .cookie('token', token, options)
      .json(
        new ApiResponse(
          200,
          {
            loggedInStudent,
            token,
          },
          'Student logged in successfully',
          true,
        ),
      )
  } catch (error: any) {
    next(error.message)
  }
}

export const logOutStudent = async (req: Request, res: Response) => {

  res
    .status(200)
    .clearCookie('token')
    .json(
      new ApiResponse(200, { }, 'Student logged out successfully', true),
    )
}