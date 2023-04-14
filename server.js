const express = require("express");
const app = express();
const leaderboardRoutes = require("./routes/leaderboardRoutes");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const cors = require("cors");

app.use(express.json());
app.use(express.static("public"));

app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hello World!!!!</h1>");
});

app.use("/leaderboard", leaderboardRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
