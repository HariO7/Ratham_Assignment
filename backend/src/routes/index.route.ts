import { Router } from "express";
import { deanLogin, studentLogin } from "../controllers/index.controller";

const router = Router();

router.post("/student/login",studentLogin);

router.post('/dean/login',deanLogin)


export default router;
