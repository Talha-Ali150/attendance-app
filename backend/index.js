const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/User.routes.js");

app.use(cors());
const dotenv = require("dotenv").config();
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Received a GET HTTP method");
});

app.use("/api/users", userRoutes);
// app.use("/api/notes", noteRoutes);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`server started on port ${port}`));
