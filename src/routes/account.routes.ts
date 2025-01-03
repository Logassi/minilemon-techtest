import { Router } from "express";
import { GetAll, Register } from "../controllers/account.controllers";
import { RegisterValidation } from "../middlewares/validations/account.validation";

const router = Router();

// router.post("/register", RegisterValidation, Register);

router.post("/register", RegisterValidation, Register);

router.get("/get-users", GetAll);

router.patch("/update-user/:id");

router.delete("/delete-user/:id");

export default router;
