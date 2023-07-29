import { Request, Response } from "express";
import connection from "../data/connection";

export const selectActiveClasses = async (
  req: Request,
  res: Response
): Promise<void> => {
  let errorCode = 400;
  try {
    const activeClasses = await connection("TURMA").where("modulo", ">", 0);
    res.status(200).send(activeClasses);
  } catch (error: any) {
    res.status(errorCode).send({ message: error.message });
  }
};
