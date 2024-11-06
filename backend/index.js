const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const port = 3000;
const server = http.createServer(app);
const connectDB = require("./config/db");
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only specific origin
    methods: ["GET", "POST", "DELETE", "PUT"], // Allow specific methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const AdminRoute = require("./Routes/AdminRoute");
const EmployeeRoute = require("./Routes/EmployeeRoute");

const productRoutes = require("./routes/ProductRoute");
const dealerRoutes = require("./routes/DealerRoute");
const warehouseRoutes = require("./routes/WarehouseRoute");
const assignmentRoutes = require("./routes/AssignmentRoute");
const orderHistoryRoutes = require("./routes/OrderHistoryRoute");

app.use("/api", AdminRoute);
app.use("/api", EmployeeRoute);
app.use("/api", productRoutes);
app.use("/api", dealerRoutes);
app.use("/api", warehouseRoutes);
app.use("/api", assignmentRoutes);
app.use("/api", orderHistoryRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
