import { Request, Response } from "express";
import { UpdateStudent } from "../models/UpdateStudent";
import connection from "../data/connection";

export const moveStudentToDifferentClass = async (req: Request, res: Response): Promise<void> => {
    let errorCode = 400;
    try {
        const input: UpdateStudent = {
            estudante_id: req.body.estudante_id,
            turma_id: req.body.turma_id
        };

        await connection.raw(`
        UPDATE ESTUDANTE 
        SET turma_id = ${input.turma_id}
        WHERE id = ${input.estudante_id}
        `);
        res.status(200).send({ message: "As informações foram atualizadas com sucesso!" })
    } catch (error: any) {
        res.status(errorCode).send({ message: error.message })
    };
};