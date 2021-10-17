import mongoose, { Schema, Document } from "mongoose";

export interface ISample extends Document {
  timestamp_ms: number;
  value: number;
}

export const SampleSchema: Schema = new mongoose.Schema({
  timestamp_ms: { type: Number, required: true },
  value: { type: Number, required: true },

});

export const Sample = mongoose.model<ISample>("Sample", SampleSchema);
