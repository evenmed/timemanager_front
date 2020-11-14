require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const { v4: uuidv4 } = require("uuid");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const resolvers = require("./schema/resolvers");
const typeDefs = require("./schema/types");

const isDev = process.env.NODE_ENV === "development";

// Connect to db
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(
    process.env.DB_PASS
  )}@${process.env.DB_SERVER}/${
    process.env.DB_NAME
  }?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 4000,
  }
);

mongoose.connection.once("open", () => {
  console.log("connected to database");
});

// Require models
require("./models/Book");
const User = require("./models/User");

// Initialize express app
const app = express();

// CORS
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

// Sessions middleware
// app.use(
//   session({
//     genid: () => uuidv4(),
//     secret: process.env.APP_SECRET,
//     key: process.env.APP_KEY,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 3600000 * 24 * 7, // 7 days
//     },
//     store: new MongoStore({ mongooseConnection: mongoose.connection }),
//   })
// );

// Enable cookies
app.use(cookieParser());

// decode JWT to get userid
app.use((req, _res, next) => {
  const { token } = req.cookies;
  console.log(token);
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }
  next();
});

// Populate user
app.use(async (req, _res, next) => {
  // Skip if they're not logged in
  if (!req.userId) return next();

  const user = await User.findById(req.userId);
  req.user = {
    username: user.username,
    permissions: user.permissions,
  };
  next();
});

// passport config
app.use(passport.initialize());
// app.use(passport.session());
passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// Start Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: isDev,
  context: ({ req, res }) => {
    return { req, res };
  },
});

server.applyMiddleware({ app, cors: false });

const port = process.env.PORT;

app.listen({ port }, () => {
  console.log(`🚀  Server ready on port ${port}`);
  if (isDev)
    console.log(`Playground: http://localhost:${port}${server.graphqlPath}`);
});
