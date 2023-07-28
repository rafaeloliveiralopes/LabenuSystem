import { Request, Response } from "express";
import { UpdateTeacher } from "../models/UpdateTeacher";
import connection from "../data/connection";

export const moveTeacherToDifferentClass = async (req: Request, res: Response): Promise<void> => {
    let errorCode = 400;
    try {
        const input: UpdateTeacher = {
            docente_id: req.body.docente_id,
            turma_id: req.body.turma_id
        };

        await connection.raw(`
        UPDATE DOCENTE 
        SET turma_id = ${input.turma_id}
        WHERE id = ${input.docente_id}
        `);

        const existingTeacher = await connection("DOCENTE")
        .where("id", input.docente_id)
        .first();

    if (!existingTeacher) {
        throw new Error('Esse professor não existe. Por favor, verifique se o ID do professor está correto.');
    }

        res.status(200).send({ message: "As informações foram atualizadas com sucesso!" })
    } catch (error: any) {
        if (error.message.includes("a foreign key constraint fails")) {
            errorCode = 422;
            error.message = "Esta turma não existe. Verifique se o id da turma está correto."
        }
        res.status(errorCode).send({ message: error.message })
    };
};