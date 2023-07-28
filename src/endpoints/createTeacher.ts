import { Request, Response } from "express";
import { SPECIALITY, Teacher } from "../models/teacher";
import connection from "../data/connection";

export const teacherCreate = async (req: Request, res: Response): Promise<void> => {
    let errorCode = 400;
    try {
        const input: Teacher = {
            id: req.body.id,
            nome: req.body.nome,
            email: req.body.email,
            data_nasc: req.body.data_nasc,
            especialidades: req.body.especialidades,
            turma_id: req.body.turma_id
        };

        if (
            !input.id ||
            !input.nome ||
            !input.email ||
            !input.data_nasc ||
            input.especialidades.length < 1
        ) {
            errorCode = 422;
            throw new Error("Verifique se todos os campos foram preenchidos corretamente");
        }

        const existingTeacherEmail = await connection("DOCENTE")
            .where("email", input.email)
            .first();

        if (existingTeacherEmail) {
            throw new Error("Este email já foi cadastrado. Registre um email diferente.");
        }

        await connection("DOCENTE").insert({
            id: input.id,
            nome: input.nome,
            email: input.email,
            data_nasc: input.data_nasc,
            turma_id: input.turma_id
        });

        for (let especialidade of input.especialidades) {
            await connection("DOCENTE_ESPECIALIDADE").insert({
                docente_id: input.id,
                especialidade_id: SPECIALITY[especialidade]
            });
        }

        res.status(201).send({ message: `Docente ${input.nome}, criado com sucesso!` });
    } catch (error: any) {
        res.status(errorCode).send({ message: error.message });
    }
};
