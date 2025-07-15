const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Api working fine");
});

// connect mongodb ;
connectDB();

app.listen(PORT, () => {
  console.log(`mongodb running on port http://localhost:${PORT}`);
});
