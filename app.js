const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");
const port = process.env.PORT || 5000;
const authRouter = require("./routes/auth");
const courseRouter = require("./routes/course");

app.use(cors());

//Connect to DB
mongoose
  .connect('mongodb+srv://akanshsaxena:Mongo%40723@covid19.neusj.mongodb.net/simplilearn', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));
//process.env.DB_CONNECT
app.use(express.json());

app.use("/api/account/user", authRouter);
app.use("/api/account/courses", courseRouter);


app.listen(port, () => console.log(`Server is Up and Running at port: ${port}`));