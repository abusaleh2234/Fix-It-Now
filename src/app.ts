import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config";
import { authRouter } from "./modules/auth/auth.router";
import { technicianRouter } from "./modules/technician/technician.router";
import { adminRouter } from "./modules/admin/admin.router";
import { servicesRouter } from "./modules/services/service.router";

const app = express();

app.use(cors({
    origin: config.app_url,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Server Running...");
});

app.use("/api/auth",authRouter)
app.use("/api/technician",technicianRouter)
app.use("/api/services",servicesRouter)
app.use("/api/admin",adminRouter)
export default app;