import { Router } from "express";
import { PostController } from "../controllers/PostController";

const router = Router();

router.get('/', PostController.list)
router.get('/:id', PostController.list)
router.post('/', PostController.create)

export default router;