import { PrismaClient } from "@prisma/client";
import { genSalt, hash } from "bcrypt";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

async function Register(req: Request, res: Response, next: NextFunction) {
  try {
    const { nama, email, password, nomorTelepon, statusAktif, departement } =
      req.body;

    const findUserEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (findUserEmail) {
      const error = new Error("Email Already Exist");
      // error.status = 409;
      throw error;
    }

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

      // console.log(
      //   `User dengan nama : ${newUser.nama} dan email : ${newUser.email}, berhasil dibuat`
      // );
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
        id: true,
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

async function UpdateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { nama, email, password, nomorTelepon, statusAktif, departement } =
      req.body;

    if (Object.keys(req.body).length === 0) {
      throw new Error("No fields provided for update.");
    }

    const findUserId = await prisma.user.findUnique({
      where: { id },
    });

    if (!findUserId) {
      throw new Error(`No user found with id ${id}`);
    }

    await prisma.$transaction(async (prisma) => {
      await prisma.user.update({
        where: { id: id },
        data: { nama, email, password, nomorTelepon, statusAktif, departement },
      });
    });

    res.status(200).send({
      message: "Success Update User",
    });
  } catch (error) {
    next(error);
  }
}

async function DeleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const findUserId = await prisma.user.findUnique({
      where: { id },
    });

    if (!findUserId) {
      throw new Error(`No user found with id ${id}`);
    }

    await prisma.$transaction(async (prisma) => {
      await prisma.user.delete({
        where: { id: id },
      });
    });

    res.status(200).send({
      message: "Success Delete User",
    });
  } catch (error) {
    next(error);
  }
}

export { Register, GetAll, UpdateUser, DeleteUser };
