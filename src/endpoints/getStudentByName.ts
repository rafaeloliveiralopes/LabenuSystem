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

    if (!/^([a-zA-ZáÁéÉíÍóÓúÚãÃõÕçÇ\s]+)$/.test(nome)) {
      throw new Error("Digite um nome válido contendo apenas letras.");
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
