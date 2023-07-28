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

        await connection("ESTUDANTE")
        .where("id", input.estudante_id)
        .update({ turma_id: input.turma_id });

        const existingStudent = await connection("ESTUDANTE")
        .where("id", input.estudante_id)
        .first();

        if(!existingStudent){
            throw new Error("Este aluno não está cadastrado no sistema. Verifique se o ID digitado está correto.");
        }

        res.status(200).send({ message: "As informações foram atualizadas com sucesso!" })
    } catch (error: any) {
        if(error.message.includes("a foreign key constraint fails")){
            errorCode = 422;
            error.message = "Esta turma não existe. Digite um ID existente."
        }
        res.status(errorCode).send({ message: error.message })
    };
};