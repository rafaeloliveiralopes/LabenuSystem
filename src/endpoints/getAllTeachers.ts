import { Request, Response } from "express";
import connection from "../data/connection";

export const listAllTeachers = async (
  req: Request,
  res: Response
): Promise<void> => {
  let errorCode = 400;
  try {
    const result = await connection("DOCENTE").select();
    res.status(200).send({ docentes: result });
  } catch (error: any) {
    res.status(errorCode).send({ message: error.message });
  }
};


