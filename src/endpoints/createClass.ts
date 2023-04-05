import { Request, Response } from "express";
import app from "../app";
import { CLASS_TYPE, Class } from "../models/types";

app.post("class", async (req: Request, res: Response) => {
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
      input.tipo !== CLASS_TYPE.FULL_TIME &&
      input.tipo !== CLASS_TYPE.NIGHT_CLASS
    ) {
      errorCode = 422;
      throw new Error("Escolha entre 'integral' e 'noturno'");
    }

    if (input.data_inicio > input.data_fim) {
      errorCode = 422;
      throw new Error("A data de início não pode ser maior que a data fim");
    }
  } catch (error: any) {
    res.status(errorCode).send({ message: error.message });
  }
});
