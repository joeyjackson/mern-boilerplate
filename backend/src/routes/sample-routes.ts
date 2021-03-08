import { Express } from "express";
import { 
  sampleCreate, 
  sampleGet, 
  sampleList,
  sampleEdit, 
  sampleDelete,
  sendRandomData,
  sendError,
} from "../controllers/sample-controllers";

export const applySampleRoutes = (app: Express, baseApiPath: string = "/api") => {
  app.route(baseApiPath + "/samples")
    .get(sampleGet)
    .post(sampleCreate)
  
  app.route(baseApiPath + "/samples/:id")
    .get(sampleList)
    .put(sampleEdit)
    .delete(sampleDelete)

  app.route(baseApiPath + "/data")
    .get(sendRandomData)

  app.route(baseApiPath + "/error")
    .get(sendError)
}