const express = require("express");

const router = express.Router();

const keyCodeController = require("../../controllers/keycode");

/* Router functions here */
router.get("/api", (req, res) => {
  res.send("hello REST API");
});

//Get specific Key Code record in the database
router.get("/api/keycodes/:keyCode", (req, res) => {
  let keyCode = req.params.keyCode;
  keyCodeController.getKeyCode(keyCode, function (result) {
    res.json(result);
  });
});

//Get all key codes records in the database
router.get("/api/keyCodes", (req, res) => {
  keyCodeController.getAllKeyCodes(function (result) {
    console.log(result);
    res.json(result);
  });
});

//New Key Code Route
router.post("/api/keycodes/newKeyCode", (req, res) => {
  if (!req.body.keyCode || !req.body.active || !req.body.description) {
    res.json({ error: true });
  } else {
    keyCodeController.createNewKeyCode(
      req.body.keyCode,
      req.body.active,
      req.body.description,
      function (result) {
        res.json(result);
      }
    );
  }
});

//Update key code record
router.put("/api/keycodes/", (req, res) => {
  console.log(req.body);
  if (!req.body.keyCode || !req.body.active || !req.body.description) {
    res.json({ error: true });
  } else {
    keyCodeController.updateKeyCodeRecord(
      req.body.keyCode,
      req.body.active,
      req.body.description,
      function (result) {
        res.json(result);
      }
    );
  }
});

//Delete specific key code record
router.delete("/api/keycodes", (req, res) => {
  if (!req.body.keyCode) {
    res.json({ error: true });
  } else {
    keyCodeController.deleteKeyCodeRecord(
      req.body.keyCode,
      function (result) {
        res.json(result);
      }
    );
  }
});

module.exports = router;
