const express = require('express');
const cors = require('cors');
const authRoute = require('./router/auth-router');
const contactRoute = require('./router/contact-router');
const connectDb = require('./utils/db');
const { errorMiddleware } = require('./middlewares/error-middleware');

const app = express();

// lets tackle CORS issue
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));


app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);

// app.get("/", (req, res) => {
//   res.status(200).send("Hello World!");
//   });

// app.get("/register", (req, res) => {
//   res.status(200).send("Welcome to the registration page");
//   });

app.use(errorMiddleware);


const PORT = 5000;
connectDb().then(()=>{
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  });
});