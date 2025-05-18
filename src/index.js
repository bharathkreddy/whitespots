import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(helmet());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.get("/api/ping", (_, res) => res.send("pong"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API on ${PORT}`));
