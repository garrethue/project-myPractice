const express = require("express");
const router = express.Router();
const textToSpeech = require("@google-cloud/text-to-speech");
const client = new textToSpeech.TextToSpeechClient();
const util = require("util");
//const pool = require("../db/pool");
const fileSystem = require("fs");
const path = require("path");
require("dotenv").config();

//HOLY SHIT IT WORKED!
//NOW: ADD GOOGLE TO THIS TO FETCH STUFF FROM 3rd PARTY API
router.get("/", async (req, res) => {
  console.log("in get!");
  try {
    // generate file path
    // OUTPUTS: /Users/garret.larson/Desktop/node-projects/yogarretsapp/server/sounds/output.mp3
    //const filePath = path.resolve(__dirname, "../sounds", "./downwarddog.mp3");

    //Call 3rd Party API (Google Text-to-Speech)

    // query the database for all prompts
    // for each prompt, generate audio
    //when practice is over, delete all audio files
    const buffer = getAudioFromText(res); //filePath);

    // get file size info
    //const stat = fileSystem.statSync(filePath);
    // console.log(stat);
    console.log(buffer);
    // set response header info
    // res.writeHead(200, {
    //   "Content-Type": "audio/mpeg",
    //   "Content-Length": buffer.length,
    //   //"Content-Length": stat.size,
    // });

    // res.write(buffer, "binary");

    // res.end(null, "binary");

    //create read stream
    //const readStream = fileSystem.createReadStream(filePath);

    // attach this stream with response stream
    //readStream.pipe(res);
    //res.send(200);

    //blaine: res.write()
    //res.end(response.audioContent)

    //delete output after sending to client
    //fileSystem.unlinkSync(filePath); //deletes the file in the path
  } catch (err) {
    console.log(err.message);
    res.send(500);
  }
});

// HELPER FUNCTION
async function getAudioFromText(res) {
  // The text to synthesize
  const text = "Hey Patrick wanna do some yoga? ";

  // Construct the request
  const request = {
    input: { text: text },
    // Select the language and SSML voice gender (optional)
    voice: { languageCode: "en-US-Standard-H", ssmlGender: "MALE" },
    // select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" },
  };

  //grab from google, bc in a primise, had to do in a .then()
  //

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request).then((response) => {
    const buffer = response[0].audioContent;
    res.writeHead(200, {
      "Content-Type": "audio/mpeg",
      "Content-Length": buffer.length,
      //"Content-Length": stat.size,
    });

    res.write(buffer, "binary");

    res.end(null, "binary");
    //return response.audioContent; //wait until promise resolves and return it
  });
  // Write the binary audio content to a local file
  //const writeFile = util.promisify(fileSystem.writeFile);
  //await writeFile(filePath, response.audioContent, "binary"); //GARRET: THIS WILL WRITE THE OUTPUT TO THE SOUNDS DIRECTORY!

  //console.log("Audio content written to file: newOutput.mp3");

  //NOTES: send response.audioContent to the client
}

module.exports = router;
