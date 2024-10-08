const express = require("express");
const cors = require("cors");
const http = require("http");
const { fileURLToPath } = require("url");
const fs = require("fs");
const path = require("path");
const YAML = require("yaml");
const swaggerUi = require("swagger-ui-express");
const { errorHandler } = require("./middlewares/error.middlewares");

//

const userRouter = require("./routes/user.routes");
const taskRouter = require("./routes/task.routes");

const bodyParser = require("body-parser");

const app = express();
const httpServer = http.createServer(app);

// Middleware30.
app.use(
  cors({
    origin: process.env.ClIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// app.use(express.json());

const file = fs.readFileSync(path.resolve(__dirname, "./swagger.yaml"), "utf8");
const swaggerDocument = YAML.parse(file);

// route

app.use("/api/v1", userRouter);
app.use("/api/v1", taskRouter);

// connect the frontend

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      docExpansion: "none", // keep all the sections collapsed by default
    },
    customSiteTitle: "Trello like task management",
  })
);

app.use(errorHandler);

module.exports = { httpServer };
