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

// increment games won by 1
router.patch("/:playerId/win", (req, res) => {
  fs.readFile("./data/players.json", (err, data) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: "cant read file",
      });
    }

    const players = JSON.parse(data);
    const playerId = req.params.playerId;
    const player = players.find((player) => player.id === playerId);

    if (!player) {
      return res.status(404).json({
        error: true,
        message: "player not found",
      });
    }

    player.gamesWon += 1;
    player.gamesPlayed += 1;

    fs.writeFile("./data/players.json", JSON.stringify(players), (err) => {
      if (err) {
        return res.status(500).json({
          error: true,
          message: "cant write file",
        });
      }

      res.json(player);
    });
  });
});

router.patch("/:playerId/lost", (req, res) => {
  fs.readFile("./data/players.json", (err, data) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: "cant read file",
      });
    }

    const players = JSON.parse(data);
    const playerId = req.params.playerId;
    const player = players.find((player) => player.id === playerId);

    if (!player) {
      return res.status(404).json({
        error: true,
        message: "player not found",
      });
    }

    player.gamesPlayed += 1;

    fs.writeFile("./data/players.json", JSON.stringify(players), (err) => {
      if (err) {
        return res.status(500).json({
          error: true,
          message: "cant write file",
        });
      }

      res.json(player);
    });
  });
});

router.post("/", (req, res) => {
  fs.readFile("./data/players.json", (err, data) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: "cant read file",
      });
    }

    const players = JSON.parse(data);
    const newPlayer = {
      id: uuid.v4(),
      name: req.body.name,
      gamesWon: 0,
      gamesPlayed: 0,
    };

    players.push(newPlayer);

    fs.writeFile("./data/players.json", JSON.stringify(players), (err) => {
      if (err) {
        return res.status(500).json({
          error: true,
          message: "cant write file",
        });
      }

      res.json(newPlayer);
    });
  });
});

// router.patch("/score", (req, res) => {
//   fs.readFile("./data/players.json", (err, data) => {
//     if (err) {
//       return res.status(500).json({
//         error: true,
//         message: "cant read file",
//       });
//     }

//     const players = JSON.parse(data);

//     // console.log(players);

//     const playerScore = req.body.score;

//     if (!players) {
//       return res.status(404).json({
//         error: true,
//         message: "players not found",
//       });
//     }

//     players.forEach((player) => {
//       player.score = playerScore;
//     });

//     // fs.writeFile("./data/players.json", JSON.stringify(players), (err) => {
//     //   if (err) {
//     //     return res.status(500).json({
//     //       error: true,
//     //       message: "cant write file",
//     //     });
//     //   }

//     //   res.json(players);
//     // });
//   });
// });

module.exports = router;
