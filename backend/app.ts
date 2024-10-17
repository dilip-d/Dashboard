import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import indexRoutes from "./routes/index";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_DOMAIN,
  })
);
app.use(express.json());

connectDB();

app.use("/", indexRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
