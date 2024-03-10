import "./pre-start"; // Must be the first import
import logger from "jet-logger";

import EnvVars from "@src/constants/EnvVars";
import server from "./server";

import connectDB from "./config/database";

// **** Run **** //

const SERVER_START_MSG =
  "Express server started on port: " + EnvVars.Port.toString();

server.listen(EnvVars.Port, async () => {
  try {
    await connectDB();
    logger.info(SERVER_START_MSG);
  } catch (error) {
    console.error(`Error:${error.message}`.red.bold);
  }
});
