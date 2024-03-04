import { Router } from "express";
import { loginUser, registerUser, logout, getSession } from "../controllers/sessions.controllers.js";
import { auth } from "../middlewares/auth.js";

export const routerSessions = Router();

//("api/session")
routerSessions.post("/register", registerUser);
routerSessions.post("/login/jwt",  loginUser );

routerSessions.get("/logout", logout);
routerSessions.get("/current", auth('jwt'), getSession);