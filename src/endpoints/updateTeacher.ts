import { Request, Response } from "express";

export const moveTeacherToDifferentClass = async (req: Request, res: Response): Promise<void> => {
    let errorCode = 400;
    try {

    } catch (error: any) {
        res.status(errorCode).send({ message: error.message })
    };
};