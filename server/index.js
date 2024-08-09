const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./db");
const { httpServer } = require("./app");

const startServer = () => {
  const port = process.env.PORT || 8080;
  httpServer.listen(port, () => {
    console.info(
      `📑 Visit the documentation at: http://localhost:${port}/api/v1/docs`
    );
    console.log(`⚙️  Server is running on port: ${port}`);
  });
};

(async () => {
  try {
    await connectDB();
    startServer();
  } catch (error) {
    console.log("MongoDB connect error: ", error);
  }
})();
