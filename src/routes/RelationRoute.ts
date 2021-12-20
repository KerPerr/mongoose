import { Router } from "express";
import { RelationController } from "../controllers/RelationController";

const router = Router();

router.post('/', RelationController.create)

router.get('/', RelationController.list)
router.put('/:id', RelationController.reponse)

export default router;