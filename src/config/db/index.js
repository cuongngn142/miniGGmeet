const mongoose = require("mongoose");

module.exports = async function connectDB() {
  try {
    const mongoUrl = process.env.MONGO_URL_ATLAS;
    // const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/miniggmeet'

    // Extract database name from URL (remove query parameters)
    const dbName = mongoUrl.split("/").pop().split("?")[0];
    if (!mongoUrl) {
      console.error("ENV MONGO_URL_ATLAS chưa được set!");
      process.exit(1); // crash có chủ đích, Render sẽ báo lỗi rõ
    }
    mongoose.set("strictQuery", true);
    await mongoose.connect(mongoUrl, {
      dbName: dbName,
    });
    console.log("Đã kết nối MongoDB thành công");
    console.log("Database:", mongoose.connection.db.databaseName);
    console.log(
      "Connection URL:",
      mongoUrl.replace(/\/\/([^:]+):([^@]+)@/, "//$1:****@")
    );

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB error:", err);
    });
  } catch (error) {
    console.error("Lỗi kết nối MongoDB:", error);
    throw error;
  }
};
