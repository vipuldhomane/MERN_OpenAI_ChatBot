import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";

//SetUp env file access
config();

const app = express();

// Middlewares
app.use(express.json());

//morgan Remove in Production
app.use(morgan("dev"));

//Routing
app.use("/api/v1", appRouter);

export default app;
