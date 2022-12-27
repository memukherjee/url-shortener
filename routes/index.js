const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Url = require("../models/url");
// @route     GET /
// @desc      Redirection of short URL
router.get("/:urlCode", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.urlCode });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No URL found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

module.exports = router;
