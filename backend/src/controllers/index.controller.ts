import { Request, Response } from "express";
import StudentModel from "../models/student.model";
import * as bcrypt from "bcrypt";
import mongoose from "mongoose";

export const studentLogin = async (req: Request, res: Response) => {
  try {
    let { id, password } = req.body;
    id = new mongoose.Types.ObjectId(id);
    const isStudent = await StudentModel.findById(id);
    if (isStudent && isStudent.password) {
      const auth = bcrypt.compareSync(password, isStudent.password);
      if (!auth) {
        return res.status(400).json({ message: "Incorrect Password" });
      }
      return res.status(200).json({ token: isStudent._id });
    } else {
      const hashpassword = bcrypt.hashSync(password, 10);
      const createStudent = await StudentModel.create({
        password: hashpassword,
      });
      return res.status(201).json({ token: createStudent._id });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

export const deanLogin = async (req: Request, res: Response) => {
  try {
    let { id, password } = req.body;
    id = new mongoose.Types.ObjectId(id);
    const isDean = await StudentModel.findById(id);
    if (isDean && isDean.password) {
      const auth = bcrypt.compareSync(password, isDean.password);
      if (!auth) {
        return res.status(400).json({ message: "Incorrect Password" });
      }
      return res.status(200).json({ token: isDean._id });
    } else {
      const hashpassword = bcrypt.hashSync(password, 10);
      const createDean = await StudentModel.create({
        password: hashpassword,
      });
      return res.status(201).json({ token: createDean._id });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};
