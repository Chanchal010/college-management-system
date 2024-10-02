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

const registerAdminSchema = Joi.object({
  fullName: Joi.string().required(),
  designation: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
  gender: Joi.string().required(),
  adminId: Joi.string()
    .pattern(/^\d{5}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Admin Id must follow the format XXXXX",
    }),
});



export const registerAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate the request body using Joi
    const { error, value } = registerAdminSchema.validate(req.body);

    if (error) {
      throw new ApiError(400, error.details[0].message);
    }

    const { fullName, password, gender, adminId, designation } = value;

    // Check if the admin already exists
    const existedAdmin = await prisma.adminAuth.findUnique({
      where: {
        adminId,
      },
    });

    if (existedAdmin) {
      throw new ApiError(400, "Admin already exists");
    }

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create the new admin in the database
    const newAdmin = await prisma.adminAuth.create({
      data: {
        fullName,
        password: hashedPassword,
        gender,
        adminId,
        designation,
      },
    });

    if (!newAdmin) {
      throw new ApiError(400, "Something went wrong while registering Admin");
    }

    // Retrieve the created admin's details
    const createdAdmin = await prisma.adminAuth.findUnique({
      where: { id: newAdmin.id },
      select: {
        fullName: true,
        gender: true,
        adminId: true,
        designation: true,
      },
    });

    if (!createdAdmin) {
      throw new ApiError(400, "Something went wrong being registering admin");
    }

    // Respond with success
    res.status(201).json(
      new ApiResponse(
        201,
        createdAdmin,
        "Admin registered successfully",
        true
      )
    );
  } catch (error: any) {
    next(error);
  }
};

export const logInAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { adminId, password } = req.body

    if (!(adminId && password)) {
      throw new ApiError(400, 'Check your credentials properly')
    }

    const admin = await prisma.adminAuth.findUnique({
      where: {
        adminId,
      },
    })

    if (!admin) {
      throw new ApiError(400, "can't find any admin with this admin id")
    }

    const validPassword = bcryptjs.compareSync(password, admin.password)

    if (!validPassword) {
      throw new ApiError(400, 'invalid password')
    }

    const token = jwt.sign(
      { id: admin.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h',
      },
    )

    const loggedInAdmin = await prisma.adminAuth.findUnique({
      where: {
        id: admin.id,
      },
      select: {
        id: true,
        adminId: true,
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
            logInAdmin,
            token,
          },
          'Admin logged in successfully',
          true,
        ),
      )
  } catch (error: any) {
    next(error.message)
  }
}

export const logOutAdmin = async (req: Request, res: Response) => {

  res
    .status(200)
    .clearCookie('token')
    .json(
      new ApiResponse(200, { }, 'Admin logged out successfully', true),
    )
}