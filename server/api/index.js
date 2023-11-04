const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("You have reached the api router");
});

module.exports = router;