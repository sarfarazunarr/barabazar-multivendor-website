const mongoose = require("mongoose");
const cors = require('cors')
const express = require("express");
const port = process.env.PORT || 8800;
const app = express();
const mongooseURI = process.env.MONGO_URI;

mongoose.connect(mongooseURI);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("connected", () => console.log("Connected with DB"));
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization', 'auth-token'],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));


app.use("/api/auth", require("./Routes/user.js"));
app.use("/api/auth/vendor", require("./Routes/vendor.js"));
app.use("/api/public", require("./Routes/public.js"));

app.listen(port, () => console.log(`Port no. ${port} is connected`));
