require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const express = require("express");
const passport = require("passport");
const cors = require("cors");

const createServer = require("./apolloServer");

const isDev = process.env.NODE_ENV === "development";

// Connect to db
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  connectTimeoutMS: 4000,
});

mongoose.connection.once("open", () => {
  console.log("connected to database");
});

// Require models
const User = require("./models/User");
require("./models/Event");

// Initialize express app
const app = express();

// CORS
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

// decode JWT to get userid
app.use((req, res, next) => {
  const authorizationHeader = req.get("authorization");

  if (authorizationHeader) {
    let userId;
    try {
      const verify = jwt.verify(
        authorizationHeader.replace("Bearer ", ""),
        process.env.APP_SECRET,
        {
          maxAge: "30 days",
        }
      );
      userId = verify.userId;
    } catch (e) {
      return next(); // Invalid token, just don't log them in
    }

    if (userId) {
      req.userId = userId;
    }
  }
  next();
});

// Populate user
app.use(async (req, _res, next) => {
  // Skip if they're not logged in
  if (!req.userId) return next();

  const user = await User.findById(req.userId);
  if (user) {
    req.user = {
      _id: String(user._id),
      username: user.username,
      permissions: user.permissions,
      preferredWorkTime: user.preferredWorkTime,
    };
  }
  next();
});

// passport config
// We only use passport to hash passwords and authenticate users.
// We don't have any sessions in the API, that's controlled through
// a session token that gets stored in the frontend and passed via
// an HTTP authorization header.
app.use(passport.initialize());
passport.use(User.createStrategy());

// Start Apollo Server
const server = createServer();

// CORS is handled by express, disable it for apollo
server.applyMiddleware({ app, cors: false });

const port = process.env.PORT;

app.listen({ port }, () => {
  console.log(`🚀🤠  Server ready on port ${port}`);
  if (isDev)
    console.log(`Playground: http://localhost:${port}${server.graphqlPath}`);
});
