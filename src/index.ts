import app from "./app";
import { classCreate } from "./endpoints/createClass";
import { studentCreate } from "./endpoints/createStudent";
import { teacherCreate } from "./endpoints/createTeacher";

app.post("/class", classCreate);
app.post("/student", studentCreate)
app.post("/teacher", teacherCreate)
