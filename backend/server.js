const express = require("express");
const sequelize = require("./config/connection");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

dotenv.config({
  path: "backend/config/config.env",
});

app.use(cookieParser());
const corsOptions = {
  credentials: true,
  ///..other options
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
const authRouter = require("./routes/authRoute");
const messageRouter = require("./routes/messengerRoute");

const PORT = process.env.PORT || 5000;

app.use("/api/messenger", authRouter);
app.use("/api/messenger", messageRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the backend");
});

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
