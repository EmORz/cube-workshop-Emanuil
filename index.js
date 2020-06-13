const env = process.env.NODE_ENV || "development";

const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const cubeRouter = require("./routes/cube");
const accessoryRouter = require("./routes/accessory");

const config = require("./config/config")[env];
const app = require("express")();

mongoose.connect(
  config.databaseUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error(err);
    }

    console.log("DB is setuo and running!");
  }
);

require("./config/express")(app);

app.use("/", authRouter);
app.use("/", accessoryRouter);
app.use("/", cubeRouter);
app.use("/", indexRouter);

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error | Cube Workshop",
  });
});

app.listen(
  config.port,
  console.log(`Listening on port ${process.env.PORT}! Now its up to you...`)
);
