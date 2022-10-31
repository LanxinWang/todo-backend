import express, {Request, Response} from "express";
import cors from "cors";
// get MongoDB driver connection
import dbo from "./db/conn";
require("dotenv").config({ path: "./config.env" });

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

// Global error handling
app.use(function (err:Error, _req:Request, res:Response) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// perform a database connection when the server starts
dbo.connectToServer(function (err:Error) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
