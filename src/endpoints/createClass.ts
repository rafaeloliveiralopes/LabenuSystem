import { Request, Response } from "express";
import { CLASS_TYPE, Class } from "../models/types";
import connection from "../data/connection";

export const classCreate = async (
  req: Request,
  res: Response
): Promise<void> => {
  let errorCode = 400;
  try {
    const input: Class = {
      id: req.body.id,
      nome: req.body.nome,
      data_inicio: req.body.data_inicio,
      data_fim: req.body.data_fim,
      modulo: 0,
      tipo: req.body.tipo,
    };

    if (
      !input.id ||
      !input.nome ||
      !input.data_inicio ||
      !input.data_fim ||
      !input.modulo ||
      !input.tipo
    ) {
      errorCode = 422;
      throw new Error(
        "Verifique se todos os campos foram preenchidos corretamente"
      );
    }

    if (
      input.tipo !== CLASS_TYPE.INTEGRAL &&
      input.tipo !== CLASS_TYPE.NOTURNO
    ) {
      errorCode = 422;
      throw new Error("Escolha entre 'integral' e 'noturno'");
    }

    if (input.data_inicio > input.data_fim) {
      errorCode = 422;
      throw new Error("A data de início não pode ser maior que a data fim");
    }

    if (input.tipo === CLASS_TYPE.NOTURNO) {
      input.nome = input.nome += "-na-night";
    }

    await connection.raw(`
    INSERT INTO TURMA (id, nome, data_inicio, data_fim, modulo, tipo)
    VALUES(
        ${input.id},
        "${input.nome}",
        "${input.data_inicio}",
        "${input.data_fim}",
        ${input.modulo},
        "${input.tipo}"
    )
    `);
    res.status(201).send({ message: `Turma ${input.nome} criada com sucesso!` });
  } catch (error: any) {
    res.status(errorCode).send({ message: error.message });
  }
};
