const express = require("express");
const cors    = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/auth",      require("./routes/auth"));
app.use("/books",     require("./routes/books"));
app.use("/favorites", require("./routes/favorites"));
app.use("/downloads", require("./routes/downloads"));
app.use("/stats",     require("./routes/stats"));
app.use("/users",     require("./routes/users"));

app.get("/", (req, res) => res.json({ message: "E-Library API running" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
