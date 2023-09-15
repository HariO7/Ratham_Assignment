import mongoose, { mongo } from "mongoose";

export interface StudentType {
  _id: mongoose.Types.ObjectId;
  name: string;
  password: string;
  slotsBooked: SlotsBooked[];
}

type SlotsBooked = {
  deanId: mongoose.Types.ObjectId;
  slot: Date;
};

const studentSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  password: { type: String, required: false },
  slotsBooked: [
    {
      deanId: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
      slot: {
        type: Date,
        required: true,
      },
    },
  ],
});

const StudentModel = mongoose.model("Student", studentSchema);

export default StudentModel;
