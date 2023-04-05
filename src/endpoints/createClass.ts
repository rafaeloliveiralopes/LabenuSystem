import { Request, Response } from "express";
import app from "../app";

app.post("turma", async (req: Request, res: Response) => {
    
  let errorCode = 400;
  try {
  } catch (error: any) {
    res.status(errorCode).send({ message: error.message });
  }
});
