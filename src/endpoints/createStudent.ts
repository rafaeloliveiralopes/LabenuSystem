import { Request, Response } from "express";
import { Student } from "../models/student";
import connection from "../data/connection";

export const studentCreate = async (
  req: Request,
  res: Response
): Promise<void> => {
  let errorCode = 400;
  try {
    const input: Student = {
      id: req.body.id,
      nome: req.body.nome,
      email: req.body.email,
      data_nasc: req.body.data_nasc,
      hobbies: req.body.hobbies,
      turma_id: req.body.turma_id,
    };

    if (
      !input.id ||
      !input.nome ||
      !input.email ||
      !input.data_nasc ||
      input.hobbies.length < 1
    ) {
      errorCode = 422;
      throw new Error(
        "Verifique se todos os campos foram preenchidos corretamente"
      );
    }

    const existingStudentEmail = await connection("ESTUDANTE")
      .where("email", input.email)
      .first();

    if (existingStudentEmail) {
      throw new Error(
        "Este email já foi cadastrado. Registre um email diferente."
      );
    }

    await connection("ESTUDANTE").insert({
      id: input.id,
      nome: input.nome,
      email: input.email,
      data_nasc: input.data_nasc,
      turma_id: input.turma_id,
    });

    //  Interação para criar ids aleaatórios para cada passatempo
    for (let hobby of input.hobbies) {
      const idHobby = Math.floor(Math.random() * 1000000);

      await connection("PASSATEMPO").insert({
        id: idHobby,
        nome: hobby,
      });

      await connection("ESTUDANTE_PASSATEMPO").insert({
        estudante_id: input.id,
        passatempo_id: idHobby,
      });
    }
    res.status(201).send({ message: `Estudante foi criado com sucesso!` });
  } catch (error: any) {
    res.status(errorCode).send({ message: error.message });
  }
};
