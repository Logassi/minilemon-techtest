import { PrismaClient } from "@prisma/client";
import { compare, genSalt, hash } from "bcrypt";
import { Request, Response, NextFunction } from "express";
import { SECRET_KEY } from "../configs";

const prisma = new PrismaClient();

async function Register(req: Request, res: Response, next: NextFunction) {
  try {
    const { nama, email, password, nomorTelepon, statusAktif, departement } =
      req.body;

    const findUserEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (findUserEmail) throw new Error("Email Sudah ada");

    // Encrypting password
    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);
    console.log("Password Hashed");

    await prisma.$transaction(async (prisma) => {
      const newUser = await prisma.user.create({
        data: {
          nama,
          email,
          password: hashPassword,
          nomorTelepon,
          statusAktif,
          departement,
        },
      });

      console.log(
        `User dengan nama : ${newUser.nama} dan email : ${newUser.email}, berhasil dibuat`
      );
    });

    res.status(200).send({
      message: "Register Success (Success Create User)",
    });
  } catch (error) {
    next(error);
  }
}

async function GetAll(req: Request, res: Response, next: NextFunction) {
  try {
    // Bisa hapus select, buat fetch all column
    const users = await prisma.user.findMany({
      select: {
        nama: true,
        email: true,
        nomorTelepon: true,
        statusAktif: true,
        departement: true,
      },
    });

    res.status(200).send({
      message: "Success fetching all users",
      data: users,
    });
  } catch (error) {
    next(error);
  }
}
export { Register, GetAll };
