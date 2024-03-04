import { Router } from "express";
import { __dirname } from "../path.js";

import { routerProducts } from "./products.js";
import { routerUsers } from "./users.js";
import { routerSessions } from "./sessions.js";
import { routerElements } from "./elements.js";


const router = Router();

//Routes
router.use('/api/products', routerProducts);
router.use('/api/users', routerUsers);
router.use('/api/session', routerSessions);
router.use('/api/elements', routerElements);

export default router;