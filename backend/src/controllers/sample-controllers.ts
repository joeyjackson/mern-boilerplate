import { Sample, ISample } from "../models/sample-models";
import { RequestHandler } from "express";

// Custom data controllers
export const sendRandomData: RequestHandler = (req, res) => {
  const data = {
    data: {
      name: "random",
      value: Math.random(),
    }
  }
  res.json(data);
}

export const sendError: RequestHandler = (req, res) => {
  throw new Error("Sample error");
}


// Sample MongoDB Mongoose REST controllers
export const sampleCreate: RequestHandler = async (req, res, next) => {
  const doc = await Sample.create(req.body);
  res.status(200).json(doc); 
}

export const sampleList: RequestHandler = async (req, res, next) => {
  const doc = await Sample.find({}, undefined).exec();
  res.status(200).json(doc);
}

export const sampleGet: RequestHandler = async (req, res, next) => {
  const doc = await Sample.findById(req.params.id).exec();
  res.status(200).json(doc);
}

export const sampleEdit: RequestHandler = async (req, res, next) => {
  const doc = await Sample.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec();
  res.status(200).json(doc);
}

export const sampleDelete: RequestHandler = async (req, res, next) => {
  const doc = await Sample.findByIdAndDelete(req.params.id).exec();
  res.status(200).json(doc);
}

