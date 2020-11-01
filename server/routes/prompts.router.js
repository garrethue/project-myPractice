const express = require("express");
const router = express.Router();
const textToSpeech = require("@google-cloud/text-to-speech");
const client = new textToSpeech.TextToSpeechClient();
//const util = require("util");
//const pool = require("../db/pool");
//const fileSystem = require("fs");
//const path = require("path");
require("dotenv").config();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/:next_pose", rejectUnauthenticated, async (req, res) => {
  console.log("in get!");
  let { next_pose } = req.params;
  let { first_name } = req.user;
  console.log(next_pose, first_name);
  try {
    getAudioFromText(res, first_name, next_pose);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

// HELPER FUNCTION
async function getAudioFromText(res, firstName, nextPose) {
  // The text to synthesize
  const text = `Hey ${firstName}, in the next few moments, you'll transition to ${nextPose}. `; //make table of prompts and randomly pick to make it more organic!

  // Construct the request
  const request = {
    input: { text: text },
    // Select the language and SSML voice gender (optional)
    voice: { languageCode: "en-US-Standard-H", ssmlGender: "MALE" },
    // select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" },
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request).then((response) => {
    const buffer = response[0].audioContent;
    res.writeHead(200, {
      "Content-Type": "audio/mpeg",
      "Content-Length": buffer.length,
    });

    // write and send to client
    res.write(buffer, "binary");
    res.end(null, "binary");
  });
}

module.exports = router;
