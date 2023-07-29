import { Request, Response } from "express";
import connection from "../data/connection";

export const selectStudentByName = async (
  req: Request,
  res: Response
): Promise<void> => {
  let errorCode = 400;
  try {
    let nome = req.query.nome as string;

    if (!nome) {
      throw new Error("Por favor, digite um nome válido.");
    }
    const result = await connection("ESTUDANTE").where(
      "nome",
      "LIKE",
      `${nome}`
    );
    res.status(200).send(result);
  } catch (error: any) {
    res.status(errorCode).send({ message: error.message });
  }
};
