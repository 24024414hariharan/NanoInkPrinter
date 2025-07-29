import express from "express";
import dotenv from "dotenv";
import appRoutes from "./routers/appRoutes";
import { loginLimiter } from "./middleware/rateLimiter";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());

app.disable("x-powered-by");

app.use(
    cors({
      origin: ["https://nanoinkprinter-1.onrender.com","http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );

app.use("/api", appRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
