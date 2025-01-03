import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const RegisterValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Invalid Email Format"),

  body("nama").notEmpty().withMessage("Name is required"),

  body("nomorTelepon")
    .notEmpty()
    .isLength({ min: 10 })
    .withMessage("Name is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be 3 characters minimum")
    .matches(/^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,16}$/)
    .withMessage(
      "Password need to have atleast 1 number, and special characters"
    ),

  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      //   console.log(errors);

      if (!errors.isEmpty()) throw new Error(errors.array()[0].msg);

      next();
    } catch (error) {
      next(error);
    }
  },
];
