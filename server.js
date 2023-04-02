const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const Employee = require("./modles/Employee");

const dotenv = require("dotenv");
dotenv.config();

const EmployeeRoute = require("./routes/employee");
const AuthRoute = require("./routes/auth");

MONGODB_URI =
  "mongodb+srv://danhnguyen:soliknokia@cluster0.n5zpf7b.mongodb.net/test";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/employee", EmployeeRoute);
app.use("/api", AuthRoute);
