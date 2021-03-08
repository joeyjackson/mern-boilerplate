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
export const sampleCreate: RequestHandler = (req, res, next) => {
  Sample.create(req.body, (err: any, doc: ISample) => {
    if (err) {
      next(err);
    }
    res.json(doc);
  });
}

export const sampleList: RequestHandler = (req, res, next) => {
  Sample.find({}, undefined)
  .exec((err: any, doc: ISample[]) => {
    if (err) {
      next(err);
    }
    res.json(doc);
  });
}

export const sampleGet: RequestHandler = (req, res, next) => {
  Sample.findById(req.params.id)
  .exec((err: any, doc: ISample | null) => {
    if (err) {
      next(err);
    }
    res.json(doc);
  });
}

export const sampleEdit: RequestHandler = (req, res, next) => {
  Sample.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .exec((err: any, doc: ISample | null) => {
    if (err) {
      next(err);
    }
    res.json(doc);
  });
}

export const sampleDelete: RequestHandler = (req, res, next) => {
  Sample.findByIdAndDelete(req.params.id)
  .exec((err: any, doc: ISample | null) => {
    if (err) {
      next(err);
    }
    res.json(doc);
  });
}

