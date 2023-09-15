import { Request, Response } from "express";
import StudentModel from "../models/student.model";
import * as bcrypt from "bcrypt";
import mongoose from "mongoose";
import DeanModel from "../models/dean.models";
import moment from "moment";

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
    console.error(error);
    return res.status(400).json({ error });
  }
};

export const deanLogin = async (req: Request, res: Response) => {
  try {
    let { id, password } = req.body;
    id = new mongoose.Types.ObjectId(id);
    const isDean = await DeanModel.findById(id);
    if (isDean && isDean.password) {
      const auth = bcrypt.compareSync(password, isDean.password);
      if (!auth) {
        return res.status(400).json({ message: "Incorrect Password" });
      }
      return res.status(200).json({ token: isDean._id });
    } else {
      const hashpassword = bcrypt.hashSync(password, 10);
      const createDean = await DeanModel.create({
        password: hashpassword,
        availableSlots: generateDates(),
      });
      return res.status(201).json({ token: createDean._id });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error });
  }
};

export const slotBooking = async (req: Request, res: Response) => {
  try {
    const deanId = req.params.deanId;
    const slot = moment(req.body.slot).toDate();
    const studentId = req.headers.token;

    const studentData = await StudentModel.findById(studentId);
    const deanData = await DeanModel.findById(deanId);
    if (deanData && studentData) {
      const availableSlots = deanData.availableSlots.filter((date) => {
        return !moment(slot).isSame(date);
      });
      await StudentModel.findByIdAndUpdate(studentId, {
        $push: {
          slotsBooked: {
            deanId,
            slot,
          },
        },
      });
      await DeanModel.findByIdAndUpdate(deanId, {
        $set: {
          availableSlots: [...availableSlots],
        },
      });
      return res.status(201).json({ message: "Slot booked" });
    } else {
      return res.status(404).json({ message: "Dean not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error });
  }
};

export const getAvailableSlots = async (req: Request, res: Response) => {
  try {
    const alldata = await DeanModel.aggregate([
      { $project: { _id: 1, availableSlots: 1 } },
    ]);

    return res.status(200).json({ availableSlots: alldata });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error });
  }
};

export const bookedSlots = async (req: Request, res: Response) => {
  try {
    const deanId = req.headers.token as string;
    if (deanId) {
      const bookedSlotsDetails = await StudentModel.aggregate([
        {
          $match: {
            "slotsBooked.deanId": new mongoose.Types.ObjectId(deanId),
          },
        },
        {
          $unwind: "$slotsBooked",
        },
        {
          $addFields: {
            studentId: "$_id",
            slotPassed: { $gte: ["$slotsBooked.slot", new Date()] },
          },
        },
        {
          $match: {
            slotPassed: true,
          },
        },
        {
          $project: {
            _id: 0,
            studentId: 1,
            slot: "$slotsBooked.slot",
          },
        },
      ]);
      return res.status(200).json({ availableSlots: bookedSlotsDetails });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error });
  }
};

function generateDates() {
  const now = moment();
  let startDate = now.clone().startOf("week").add(3, "days").set({ hour: 10 });

  if (startDate.day() === 4 || startDate.day() === 5) {
    startDate.add(1, "week");
  }
  const dates: string[] = [];

  for (let i = 0; i < 3; i++) {
    const date = moment(startDate);
    date.add(i, "hours");
    dates.push(date.format("DD/MMM/YYYY hh:mm:ss"));
  }
  startDate.add(1, "days");
  for (let i = 0; i < 3; i++) {
    const date = moment(startDate);
    date.add(i, "hours");
    dates.push(date.format("DD/MMM/YYYY hh:mm:ss"));
  }

  return dates;
}
