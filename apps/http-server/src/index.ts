import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import walletRouter from "./routes/wallet.route";
dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 3001;

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use("/wallet",walletRouter);

app.listen(port, () => {
  console.log(`Kurabox server running on port ${port}`);
});
