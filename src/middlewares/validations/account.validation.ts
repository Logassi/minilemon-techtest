import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";

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
    .withMessage("Minimum 10 digit"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters minimum")
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

export const UpdateValidation = [
  param("id").isUUID().withMessage("Invalid id format"),

  body("nama").optional().isString().withMessage("Nama must be a string"),

  body("email").optional().isEmail().withMessage("Invalid email format"),

  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,16}$/)
    .withMessage(
      "Password must include at least one number and one special character"
    ),

  body("nomorTelepon")
    .optional()
    .isLength({ min: 10 })
    .withMessage("Nomor Telepon must be at least 10 digits"),

  body("statusAktif")
    .optional()
    .isBoolean()
    .withMessage("Status Aktif must be a boolean"),

  body("departement")
    .optional()
    .isString()
    .withMessage("Departement must be a string"),

  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error(errors.array()[0].msg);
      }
      next();
    } catch (error) {
      next(error);
    }
  },
];
