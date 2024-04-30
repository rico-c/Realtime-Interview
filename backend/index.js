const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const session = require("express-session");
const router = require("./routes/index.js");
const dbConfig = require("./mongodb/config");
require("./mongodb");

const app = express();
const MongoStore = require("connect-mongo")(session);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(
  session({
    secret: "realtime-interview-secreat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === 'development' ? false : true,
      httpOnly: process.env.NODE_ENV === 'development' ? false : true,
      sameSite: process.env.NODE_ENV === 'development' ? false : 'none',
    },
    store: new MongoStore({
      url: dbConfig,
      autoRemove: "interval", // 过期自动删除
      autoRemoveInterval: 24 * 60 * 7,
    })
  })
);
app.enable('trust proxy');
app.use(cors({credentials: true, origin: "*"}));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

router(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
