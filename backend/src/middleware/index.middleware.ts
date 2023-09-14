import { NextFunction, Request, Response } from "express";
import StudentModel from "../models/student.model";
import DeanModel from "../models/dean.models";

export const validateStudentToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { token } = req.headers;
    const student = await StudentModel.findById(token);
    if(!student){
        return res.status(401).json({message: "Unauthorised"})
    }else{
        next()
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

export const validateDeanToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let { token } = req.headers;
      const dean = await DeanModel.findById(token);
      if(!dean){
          return res.status(401).json({message: "Unauthorised"})
      }else{
          next()
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  };
