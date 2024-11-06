const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const port = 3000;
const server = http.createServer(app);
const connectDB = require("./config/db");
app.use(
  cors({
    origin: "https://logistics-crm-frontend.vercel.app", // Allow only specific origin
    methods: ["GET", "POST", "DELETE", "PUT"], // Allow specific methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const AdminRoute = require("./Routes/AdminRoute");
const EmployeeRoute = require("./Routes/EmployeeRoute");

const productRoute = require("./Routes/ProductRoute");
const dealerRoute = require("./Routes/DealerRoute");
const warehouseRoute = require("./Routes/WarehouseRoute");
const assignmentRoute = require("./Routes/AssignmentRoute");
const orderHistoryRoute = require("./Routes/OrderHistoryRoute");

app.use("/api", AdminRoute);
app.use("/api", EmployeeRoute);
app.use("/api", productRoute);
app.use("/api", dealerRoute);
app.use("/api", warehouseRoute);
app.use("/api", assignmentRoute);
app.use("/api", orderHistoryRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
