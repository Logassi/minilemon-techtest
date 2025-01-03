import { Request, Response, NextFunction } from "express";

const allowedFields = [
  "id",
  "nama",
  "email",
  "password",
  "nomorTelepon",
  "statusAktif",
  "departement",
];

export function ValidateFields(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bodyKeys = Object.keys(req.body);

    const invalidFields = bodyKeys.filter(
      (key) => !allowedFields.includes(key)
    );

    if (invalidFields.length > 0) {
      res.status(400).send({
        message: `Invalid fields: ${invalidFields.join(", ")}`,
        allowedFields,
      });

      return;
    }

    next();
  } catch (error) {
    next(error);
  }
}
