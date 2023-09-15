import mongoose from "mongoose";

export interface DeanType {
  _id: mongoose.Types.ObjectId;
  password: string;
  availableSlots: Date[];
}

const deanSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  password: { type: String, required: false },
  availableSlots: [{ type: Date, required: false }],
});

const DeanModel = mongoose.model("Dean", deanSchema);

export default DeanModel;
