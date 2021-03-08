import express from "express";
import path from "path";
import http from "http";
import dotenv from 'dotenv';
import cors from "cors";
import { connectToMongo } from "./mongodb";
import { applySampleRoutes } from "./routes/sample-routes";
import { sampleErrorHandlerMiddleware, sampleLogRequestTimeMiddleware } from "./middleware/sample-middleware";

dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });

// Uncomment if using mongodb
// connectToMongo();

const INDEX_HTML_DIR = path.join(__dirname, "..", "..", "react-app", "build");
const PORT = (process.env.PORT || "3001") as unknown as number;
const HOST = process.env.HOST || "localhost";
const NODE_ENV = process.env.NODE_ENV || "production";
const app = express();

// Enable CORS for local development
if (NODE_ENV === "development") {
  console.log("CORS enabled");
  app.use(cors());
} else {
  console.log("CORS disabled");
}

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(INDEX_HTML_DIR));
// Apply express middleware
app.use(sampleLogRequestTimeMiddleware);

app.get("/", (req, res) => {
  res.sendFile(path.join(INDEX_HTML_DIR, "index.html"))
});
// Configure api routes
applySampleRoutes(app);

const server = http.createServer(app);

server.listen(PORT, HOST, () => {
  console.log(`Server started in mode "${NODE_ENV}" at http://${HOST}:${PORT}`);
})

// Apply error handling middleware
app.use(sampleErrorHandlerMiddleware);
