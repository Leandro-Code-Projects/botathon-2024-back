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

app.get("/trigger", (req, res) => {
  res.status(200).json({
    dia: "7",
    hora: "8",
    localidad: "9",
    medico: "10",
    email: "leandrocode2785@gmail.com"
  })
})

export default app;
