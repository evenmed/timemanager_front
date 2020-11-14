require("dotenv").config();
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const { v4: uuidv4 } = require("uuid");
const passport = require("passport");
// const cookieParser = require("cookie-parser");

const resolvers = require("./schema/resolvers");
const typeDefs = require("./schema/types");

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

// Sessions middleware
app.use(
  session({
    genid: () => uuidv4(),
    secret: process.env.APP_SECRET,
    key: process.env.APP_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000 * 24 * 7, // 7 days
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// passport config
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Start Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
  },
});

server.applyMiddleware({ app });

const port = process.env.PORT;

// The `listen` method launches a web server.
app.listen({ port }, () => {
  console.log(`🚀  Server ready on port ${port} (http://localhost:${port})`);
});
