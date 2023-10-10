/**
 * @requires mongoose
 * @requires express
 * @requires operation
 */

// $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\Jade\Downloads\ass3\assignment-3\src\fit2095key.json"

const mongoose = require("mongoose");
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require("path");
const fs = require("fs");
const textToSpeech = require('@google-cloud/text-to-speech');
const client = new textToSpeech.TextToSpeechClient();


const Operation = require("./backend/models/operation");
const url = "mongodb://127.0.0.1:27017/assignment02";
// express will serve angular as a static asset
app.use(express.static(path.join(__dirname, "dist/assignment-3")));
app.use(express.static(path.join(__dirname, "audio-files")));
//serve audio as static file in audio-files folder


app.use(express.json());
app.get("/assignment-3", (req, res) => {});


// text to speech
io.on("connection", (socket) => {
    console.log("new connection-->" + socket.id);

    socket.on("textToSpeech", (data) => {
        const inputText = data.text;
        console.log("Received text for conversion:", inputText);
        const request = {
            input: {
                text: inputText
            },
            voice: {
                languageCode: "en-US",
                ssmlGender: "NEUTRAL"
            },
            audioConfig: {
                audioEncoding: "MP3"
            }
        };

        client.synthesizeSpeech(request, (err, response) => {
            if (err) {
                console.error("Text-to-Speech conversion error:", err);
                socket.emit("text to speech error", {error: "conversion failed."});
            } else {
                console.log("Text-to-Speech successful");
                const audioContent = response.audioContent;

                // Save the audio content to a local file
                fs.writeFile("audio-files/output.mp3", audioContent, "binary", (err) => {
                    if (err) {
                        console.error("texttospeech error:", err);
                        socket.emit("text to speech error", {error: "speech failed."});
                    } else {
                        console.log("Audio content written to file: output.mp3");

                        socket.emit("text to speech successful", {audioFile: "coutput.mp3"});
                    }
                });
            }


        });
    });
});


// app.use(express.urlencoded({extended: true}));
/**
 * Asynchronous function to initialize operation counters.
 */
async function asyncCall() {
    let existingAddOperation = await Operation.findOne({operation: "add"});
    if (! existingAddOperation) {
        let anOperation = new Operation({operation: "add"});
        await anOperation.save();
    } else {
        await Operation.findOneAndUpdate({
            operation: "add"
        }, {counter: 0});
    }
    let existingUpdateOperation = await Operation.findOne({operation: "update"});
    if (! existingUpdateOperation) {
        let anOperation = new Operation({operation: "update"});
        await anOperation.save();
    } else {
        await Operation.findOneAndUpdate({
            operation: "update"
        }, {counter: 0});
    }
    let existingDeleteOperation = await Operation.findOne({operation: "delete"});
    if (! existingDeleteOperation) {
        let anOperation = new Operation({operation: "delete"});
        await anOperation.save();
    } else {
        await Operation.findOneAndUpdate({
            operation: "delete"
        }, {counter: 0});
    }
}
asyncCall();

/**
 * Require and use the event, category, original router.
 */
// const eventRouter = require("./backend/routes/event-api");
// app.use("/sidd/api/v1", eventRouter);

// const categoryRouter = require("./backend/routes/category-api");
// // C:\Users\Jade\Downloads\ass3\assignment-3\backend\routes\category-api.js
// app.use("/api/v1/category/33306036", categoryRouter);


const catCont = require("./backend/controller/category-controller");
app.post("/add-category", catCont.addCategory);
app.get("/list-category", catCont.listCategory);
app.delete("/delete-category/:catId", catCont.deletingCategory);
app.put("/update-category/:catId", catCont.updateCategory);
app.get("/display-category/:catId", catCont.displayCategory);

const eventCont = require("./backend/controller/event-controller")
app.post("/add-event", eventCont.insertEvent);
app.get("/events", eventCont.listEvents);
// app.delete("/delete-event/:eventId", eventCont.deleteEvent);
// app.put("/update-category/:eventId", eventCont.updateEvent);
// app.get("/display-event/:eventId", eventCont.displayEvent);


const statsCont = require("./backend/controller/stats");
app.get("/stats1/categories", statsCont.countCategories);
app.get("/stats1/events", statsCont.countEvents);


/**
 * Asynchronous function to connect to the MongoDB database.
 * @param {string} url - The MongoDB connection URL.
 * @returns {string} - A message indicating the connection status.
 */
async function connect(url) {
    await mongoose.connect(url);
    return "Connected Successfully";
}

const PORT_NUMBER = 8080;

connect(url).then(() => {
    server.listen(PORT_NUMBER, () => {
        console.log("Server is listening on port 8080");
    });
}).catch((err) => console.log(err));


// app.get("/" , async function (req, res) {
//     const firstCategory =await Category.findOne();
//     if (firstCategory == null){
//         res.render("index", {catID: ""});
//     }else{
//         console.log(firstCategory);
//         res.render("index", {catID: firstCategory.catId});
//     }
// });
