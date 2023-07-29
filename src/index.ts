import app from "./app";
import { classCreate } from "./endpoints/createClass";
import { studentCreate } from "./endpoints/createStudent";
import { teacherCreate } from "./endpoints/createTeacher";
import { listAllTeachers } from "./endpoints/getAllTeachers";
import { moveStudentToDifferentClass } from "./endpoints/updateStudentClass";
import { moveTeacherToDifferentClass } from "./endpoints/updateTeacherClass";

app.post("/class", classCreate);

app.post("/student", studentCreate);
app.put("/student/update", moveStudentToDifferentClass);

app.post("/teacher", teacherCreate);
app.put("/teacher/update", moveTeacherToDifferentClass);
app.get("/teacher/all", listAllTeachers);
