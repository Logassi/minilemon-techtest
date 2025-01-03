import { Router } from "express";
import {
  DeleteUser,
  GetAll,
  Register,
  UpdateUser,
} from "../controllers/account.controllers";
import {
  RegisterValidation,
  UpdateValidation,
} from "../middlewares/validations/account.validation";
import { ValidateFields } from "../middlewares/allowed.fields.middleware";

const router = Router();

router.post("/register", ValidateFields, RegisterValidation, Register);

router.get("/get-users", GetAll);

router.patch("/update-user/:id", ValidateFields, UpdateValidation, UpdateUser);

router.delete("/delete-user/:id", DeleteUser);

export default router;
