const express = require("express");
const router = express.Router();
const fs = require("fs");
const uuid = require("uuid");

// get leaderboard name

router.get("/", (req, res) => {
  fs.readFile("./data/players.json", (err, data) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: "cant read file",
      });
    }

    const players = JSON.parse(data);

    res.json(players);
  });
});

module.exports = router;
