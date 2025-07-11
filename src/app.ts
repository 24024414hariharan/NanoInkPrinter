import express from "express";
import dotenv from "dotenv";
import appRoutes from "./routers/appRoutes";
import { loginLimiter } from "./middleware/rateLimiter";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api", appRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
