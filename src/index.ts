import app from "./app";
import { classCreate } from "./endpoints/createClass";

app.post("/class", classCreate);
