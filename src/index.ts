import app from "./app";
import { Request, Response } from "express";
import { classCreate } from "./endpoints/createClass";
import { studentCreate } from "./endpoints/createStudent";
import { teacherCreate } from "./endpoints/createTeacher";
import { listAllTeachers } from "./endpoints/getAllTeachers";
import { selectStudentByName } from "./endpoints/getStudentByName";
import { selectActiveClasses } from "./endpoints/getActiveClasses";
import { moveStudentToDifferentClass } from "./endpoints/updateStudentClass";
import { moveTeacherToDifferentClass } from "./endpoints/updateTeacherClass";

app.post("/class", classCreate);
app.get("/class/active", selectActiveClasses);

app.post("/student", studentCreate);
app.put("/student/update", moveStudentToDifferentClass);
app.get("/student", selectStudentByName);

app.post("/teacher", teacherCreate);
app.put("/teacher/update", moveTeacherToDifferentClass);
app.get("/teacher/all", listAllTeachers);

// Teste de deploy
app.get("/", (req: Request, resp: Response) => {
  resp.send("Depoyed!");
});
