const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const userRouter = require("./routes/userRoutes");

const articleRoute = require("./routes/articleRoutes");
const subscriptionRoute = require("./routes/subscriptionRoute");
const adminRouter = require("./routes/adminRoutes");
const publisherRouter = require("./routes/publisherRoute");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Api working fine");
});

app.use("/web/api/", authRoutes);
app.use("/web/api/", userRouter);
app.use("/web/api/", articleRoute);
app.use("/web/api/", subscriptionRoute);
app.use("/web/api/", adminRouter);
app.use("/web/api/", publisherRouter);

// connect mongodb ;
connectDB();

app.listen(PORT, () => {
  console.log(`mongodb running on port http://localhost:${PORT}`);
});
