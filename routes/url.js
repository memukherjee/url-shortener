const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const uniqid = require("uniqid");

const Url = require("../models/url");

// @route     POST /api/url/shorten
// @desc      Create short URL
router.post("/shorten", async (req, res) => {
  console.log(req.body);
  const { longUrl, customUrlCode } = req.body;
  const baseUrl = process.env.BASE_URL;

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base URL");
  }

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      // Finding the long url in the database
      let url = await Url.findOne({ longUrl });

      if (url) {
        // If the long url is found in the database, return the short url
        res.json(url);
      } else {
        // Check custom url code if it exists in the database or not
        if (customUrlCode) {
          try {
            const url = await Url.findOne({ urlCode: customUrlCode });
            if (url) {
              return res.status(401).json("Custom URL code already exists");
            }
          } catch (err) {
            console.error(err);
            res.status(500).json("Server error");
          }
        }

        // Create url code
        const urlCode = customUrlCode ?? uniqid();

        // If the long url is not found in the database, create a new short url
        const shortUrl = baseUrl + "/" + urlCode;
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
        });
        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Server error");
    }
  } else {
    res.status(401).json("Invalid long URL: "+longUrl);
  }
});

module.exports = router;
