import { Router } from "express";
import { getUsers, putUser, deleteUser, getTickets } from "../controllers/users.controllers.js";
import { auth, roleValidation } from "../middlewares/auth.js";

export const routerUsers = Router();

//("api/users")
routerUsers.get('/', auth('jwt'), roleValidation(["admin"]), getUsers);
routerUsers.get('/tickets/:uid', auth('jwt'), roleValidation(["admin"]), getTickets);

routerUsers.put('/:uid', auth('jwt'), roleValidation(["admin"]), putUser);
routerUsers.delete('/:uid', auth('jwt'), roleValidation(["admin"]), deleteUser);