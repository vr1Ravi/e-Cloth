import { app } from "./app";
import { connectMongoDb } from "./utils/mongodb";

// mongodb connection
connectMongoDb().then(() => {
  console.log("MongoDB connected");
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on port: ${process.env.PORT}`);
});
