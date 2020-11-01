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
  let { next_pose } = req.params;
  let { first_name } = req.user;
  try {
    getAudioFromText(res, getPromptText(first_name, next_pose));
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

// HELPER FUNCTION
async function getAudioFromText(res, prompt) {
  // Construct the request
  const request = {
    input: { text: prompt },
    // Select the language and SSML voice gender (optional)
    voice: { languageCode: "en-US-Standard-H", ssmlGender: "MALE" },
    // select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" },
  };

  // Performs the text-to-speech request
  const [response] = await client
    .synthesizeSpeech(request)
    .then((response) => {
      const buffer = response[0].audioContent;
      res.writeHead(200, {
        "Content-Type": "audio/mpeg",
        "Content-Length": buffer.length,
      });
      // write and send to client
      res.write(buffer, "binary");
      res.end(null, "binary");
    })
    .catch((err) => console.log(err));
}
function getPromptText(firstName, nextPose) {
  let arrOfPrompts = [
    `${firstName} your next pose is ${nextPose}`,
    `Hey ${firstName}, in the next few moments, you'll transition to ${nextPose}.`,
    `${firstName}, ${nextPose} is your next pose.`,
    `${nextPose} is next.`,
    `You will be transitioning into ${nextPose}`,
  ];
  return arrOfPrompts[Math.floor(Math.random() * arrOfPrompts.length)];
}

module.exports = router;
