import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(
  process.env.MONGODB_URL || "mongodb://merelu:rbgksla@localhost:27017/admin",
  {
    dbName: "cmazon",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.get("/", (req, res) => {
  res.send("Server is ready");
});
const port = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
  next();
});

app.listen(5000, () => {
  console.log(`Serve at http://localhost:${port}`);
});
