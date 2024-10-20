import mongoose from "mongoose";

const connectDB = (uri:string) => {
  mongoose
    .connect(uri, {dbName: "betApp"})
    .then((data) => console.log(`Connected to DB: ${data.connection.host}`))
    .catch((error) => {
      console.log(error);
    });
};

export { connectDB };
