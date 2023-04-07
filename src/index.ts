import app from "./app";
import { classCreate } from "./endpoints/createClass";
import { studentCreate } from "./endpoints/createStudent";

app.post("/class", classCreate);
app.post("/student", studentCreate)
