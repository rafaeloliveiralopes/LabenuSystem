import { Request, Response } from "express";
import { Student } from "../models/student";
import connection from "../data/connection";

export const studentCreate = async (req: Request, res: Response): Promise<void> => {
    let errorCode = 400;
    try {
        const input: Student = {
            id: req.body.id,
            nome: req.body.nome,
            email: req.body.email,
            data_nasc: req.body.data_nasc,
            hobbies: req.body.hobbies,
            turma_id: req.body.turma_id
        };

        if (
            !input.id ||
            !input.nome ||
            !input.email ||
            !input.data_nasc ||
            input.hobbies.length < 1
        ) {
            errorCode = 422;
            throw new Error("Verifique se todos os campos foram preenchidos corretamente");
        }

        
        await connection.raw(`
        INSERT INTO ESTUDANTE(id, nome, email, data_nasc, turma_id)
        VALUES(
            ${input.id},
            "${input.nome}",
            "${input.email}",
            "${input.data_nasc}",
            ${input.turma_id}
        )
        `);

       
        for (let hobby of input.hobbies) {
            const idHobby = Math.floor(Math.random() * 1000000);
            await connection.raw(`
            INSERT INTO PASSATEMPO(id, nome)
            VALUES(
                ${idHobby},
                "${hobby}"
            )
            `);

            await connection.raw(`
            INSERT INTO ESTUDANTE_PASSATEMPO(estudante_id, passatempo_id)
            VALUES(
                ${input.id},
                ${idHobby}
            )
            `);
        };
        res.status(201).send({ message: `Estudante foi criado com sucesso!` })
    } catch (error: any) {
        res.status(errorCode).send({ message: error.message });
    }
};
