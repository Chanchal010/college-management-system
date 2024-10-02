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

const registerTeacherSchema = Joi.object({
  fullName: Joi.string().required(),
  designation: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
  gender: Joi.string().required(),
  employeeId: Joi.string()
    .pattern(/^\d{5}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Employee Id must follow the format XXXXX",
    }),
});



export const registerTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate the request body using Joi
    const { error, value } = registerTeacherSchema.validate(req.body);

    if (error) {
      throw new ApiError(400, error.details[0].message);
    }

    const { fullName, password, gender, employeeId, designation } = value;

    // Check if the teacher already exists
    const existedTeacher = await prisma.facultyAuth.findUnique({
      where: {
        employeeId,
      },
    });

    if (existedTeacher) {
      throw new ApiError(400, "Teacher already exists");
    }

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create the new teacher in the database
    const newTeacher = await prisma.facultyAuth.create({
      data: {
        fullName,
        password: hashedPassword,
        gender,
        employeeId,
        designation,
      },
    });

    if (!newTeacher) {
      throw new ApiError(400, "Something went wrong while registering teacher");
    }

    // Retrieve the created teacher's details
    const createdTeacher = await prisma.facultyAuth.findUnique({
      where: { id: newTeacher.id },
      select: {
        fullName: true,
        gender: true,
        employeeId: true,
        designation: true,
      },
    });

    if (!createdTeacher) {
      throw new ApiError(400, "Something went wrong being registering teacher");
    }

    // Respond with success
    res.status(201).json(
      new ApiResponse(
        201,
        createdTeacher,
        "Teacher registered successfully",
        true
      )
    );
  } catch (error: any) {
    next(error);
  }
};

export const logInTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { employeeId, password } = req.body

    if (!(employeeId && password)) {
      throw new ApiError(400, 'Check your credentials properly')
    }

    const teacher = await prisma.facultyAuth.findUnique({
      where: {
        employeeId,
      },
    })

    if (!teacher) {
      throw new ApiError(400, "can't find any teacher with this employee id")
    }

    const validPassword = bcryptjs.compareSync(password, teacher.password)

    if (!validPassword) {
      throw new ApiError(400, 'invalid password')
    }

    const token = jwt.sign(
      { id: teacher.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h',
      },
    )

    const loggedInTeacher = await prisma.facultyAuth.findUnique({
      where: {
        id: teacher.id,
      },
      select: {
        id: true,
        employeeId: true,
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
            loggedInTeacher,
            token,
          },
          'Teacher logged in successfully',
          true,
        ),
      )
  } catch (error: any) {
    next(error.message)
  }
}

export const logOutTeacher = async (req: Request, res: Response) => {

  res
    .status(200)
    .clearCookie('token')
    .json(
      new ApiResponse(200, { }, 'Teacher logged out successfully', true),
    )
}