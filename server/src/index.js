require("dotenv").config();
const app       = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  app.listen(PORT, "0.0.0.0", () =>
    console.log(`🚀  FlowTrack API → http://localhost:${PORT}  [${process.env.NODE_ENV}]`)
  );
};

start().catch(err => { console.error(err); process.exit(1); });