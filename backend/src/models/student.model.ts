import mongoose from "mongoose";

export interface StudentType {
  _id: mongoose.Types.ObjectId;
  name: string;password: string;
  slotsBooked: Date[];
}

const studentSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  password: { type: String, required: false },
  slotsBooked: [{ type: Date, required: false }],
});

const StudentModel = mongoose.model("Student", studentSchema);

export default StudentModel;
