import express, { Application } from "express";
import accountRoute from "./routes/account.routes";
import ErrorMiddleware from "./middlewares/error.handler.middleware";

const app: Application = express();

//Middleware function in Express.js that parses incoming JSON payloads and makes the data available in req.body
app.use(express.json());

app.use("/account-management", accountRoute);

app.use(ErrorMiddleware);

export default app;
