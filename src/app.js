import express from "express";
import routes from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/mssbook", routes);

export default app;
