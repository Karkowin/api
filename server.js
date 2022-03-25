// Import dependencie
const express = require("express");
var cors = require("cors");

// Setup the express server
const app = express();
const port = 8080;

// Import middlewares into express
app.use(express.json({ limit: "100mb" }));
app.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

// Import routes
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const housesRouter = require("./routes/houses");
const aidsRouter = require("./routes/aids");
const accompanyRouter = require("./routes/accompany");

// Setup all the routes
app.use("/auth", authRouter);
app.use("/jobs", jobsRouter);
app.use("/houses", housesRouter);
app.use("/aids", aidsRouter);
app.use("/accompany", accompanyRouter);

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
