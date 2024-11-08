import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.get("/ping", (req, res) => {
  res.status(200).send("pong")
});

export default app;
