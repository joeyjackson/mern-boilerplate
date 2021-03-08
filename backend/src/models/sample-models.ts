import mongoose, { Schema, Model, Document } from "mongoose";

export interface ISample extends Document {
  field: string;
}

export const SampleSchema: Schema = new mongoose.Schema({
  field: { type: String, required: true }
});

export const Sample: Model<ISample> = mongoose.model("Sample", SampleSchema);
