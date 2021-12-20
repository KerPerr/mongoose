import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();

router.get('/authenticated', AuthController.authenticated)
router.post('/register', AuthController.register)
router.get('/logout', AuthController.logout)
router.post('/login', AuthController.login)

export default router;