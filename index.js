const env = process.env.NODE_ENV || "development";

const mongoose = require("mongoose");

const config = require("./config/config")[env];
const app = require("express")();



mongoose.connect(config.databaseUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
},
  (err) => {
    if (err) {
      console.error(err);
    }

    console.log("DB is setuo and running!");
  }
);

require("./config/express")(app);
require("./routes")(app);

app.listen(
  config.port,
  console.log(`Listening on port ${process.env.PORT}! Now its up to you...`)
);
