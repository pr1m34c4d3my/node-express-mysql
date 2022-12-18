let express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  res.status(200);
  res.json({
    message: "Succes",
    method: req.method,
  });
});

module.exports = router;
