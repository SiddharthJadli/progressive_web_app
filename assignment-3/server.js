/**
 * @requires mongoose
 * @requires express
 * @requires operation
 */
// node .\server.js

const mongoose = require("mongoose");
const express = require('express');
const path = require("path");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io');
const socket = io(server); 
const textToSpeech = require('@google-cloud/text-to-speech');
const client = new textToSpeech.TextToSpeechClient();


const Operation = require("./backend/models/operation");
const url = "mongodb://127.0.0.1:27017/assignment02";

// express will serve angular as a static asset
app.use(express.static(path.join(__dirname, "dist/assignment-3")));
app.use(express.json());


socket.on("connection", socket => {
    console.log("new connectiion=" + socket.id);

    socket.on("textToSpeech", async (data) => {
        try {
            const speech = data.textToSpeech;

            const request =({
                input: {
                    text: speech
                },
                voice: {
                    languageCode: "en-US", ssmlGender: "NEUTRAL"
                },
                audioConfig: {
                    audioEncoding: 'MP3'
                }
            });
            const [response] = await textToSpeechClient.synthesizeSpeech(request);

            socket.emit("convertedText", response.audioContent);
        } catch (error) {
            socket.emit("SpeechError", { error: "Invalid Data" });
        }
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
app.delete("/delete-category/", catCont.deletingCategory);
app.put("/update-category", catCont.updateCategory);


// for labels in html
const counters = require("./backend/routes/operation-api");
app.use("/count", counters);

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
    app.listen(PORT_NUMBER, () => {
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
