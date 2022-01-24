const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const tokenValidate = require("./middlewares/tokenValidate");

const { success, error } = require("consola");

const { DB, PORT } = require("./config");

const swaggerUi = require('swagger-ui-express');

const app = express();
const port = PORT || 3001;

const swaggerDocument = require('./swagger.json');


// routes
const auctionRoutes = require("./routes/auctionRoutes");

const accountRoutes = require("./routes/accountRoutes");

const startApp = async () => {
  await mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      app.use(bodyParser.json());
      app.use(cors());
      app.use(passport.initialize());
      app.use(
        bodyParser.urlencoded({
          extended: true,
        })
      );
      app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


      tokenValidate(passport);

      app.use("/auction", auctionRoutes);
      app.use("/account", accountRoutes);
      app.listen(port, () =>
        success({
          message: `successfully connected with db: ${DB} and Listening on port ${port}`,
          badge: true,
        })
      );
    })
    .catch((error) => {
      error({
        message: `${error}`,
        badge: true,
      });
    });
};
// Connect to MongoDB database

startApp();
