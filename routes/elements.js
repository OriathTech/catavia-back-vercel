import { Router } from "express";
import { getElements, postElement, putElement, deleteElement} from "../controllers/elements.controllers.js"
import { auth, roleValidation } from "../middlewares/auth.js";

export const routerElements = Router();

//("api/elements")
routerElements.get('/', getElements);
routerElements.post('/', auth('jwt'), roleValidation(["admin"]), auth('jwt'), roleValidation(["admin"]), postElement);

routerElements.put('/:eid', auth('jwt'), roleValidation(["admin"]), putElement);
routerElements.delete('/:eid', auth('jwt'), roleValidation(["admin"]), deleteElement);