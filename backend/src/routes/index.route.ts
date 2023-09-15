import { Router } from "express";
import {
  bookedSlots,
  deanLogin,
  getAvailableSlots,
  slotBooking,
  studentLogin,
} from "../controllers/index.controller";
import {
  validateDeanToken,
  validateStudentToken,
} from "../middleware/index.middleware";

const router = Router();

router.post("/student/login", studentLogin);

router.post("/dean/login", deanLogin);

router.get("/dean/availableslots", validateStudentToken, getAvailableSlots);

router.put("/dean/slotBooking/:deanId", validateStudentToken, slotBooking);

router.get("/dean/bookedSlots", validateDeanToken, bookedSlots);

router.delete("//:id");

export default router;
