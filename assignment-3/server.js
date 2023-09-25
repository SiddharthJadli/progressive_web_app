/**
 * @requires mongoose
 * @requires express
 * @requires operation
 */
const mongoose = require("mongoose");
const express = require('express');
const path = require("path");


const Operation = require("./backend/models/operation");

const url = "mongodb://127.0.0.1:27017/assignment02";

const app = express();
// const ejs = require("ejs");


//express will serve angular as a static asset
app.use(express.static(path.join(__dirname, "assignment-3/dist/assignment-3")));

app.use(express.json());
// app.use(express.urlencoded({extended: true}));
/**
 * Asynchronous function to initialize operation counters.
 */
async function asyncCall() {
    let existingAddOperation = await Operation.findOne({operation: "add"});
    if (! existingAddOperation) {
        let anOperation = new Operation({operation: "add"});
        await anOperation.save();
    }else{
        await Operation.findOneAndUpdate({ operation: "add"}, {counter: 0});
    }
    let existingUpdateOperation = await Operation.findOne({operation: "update"});
    if (! existingUpdateOperation) {
        let anOperation = new Operation({operation: "update"});
        await anOperation.save();
    }else{
        await Operation.findOneAndUpdate({ operation: "update"}, {counter: 0});
    }
    let existingDeleteOperation = await Operation.findOne({operation: "delete"});
    if (! existingDeleteOperation) {
        let anOperation = new Operation({operation: "delete"});
        await anOperation.save();
    }else{
        await Operation.findOneAndUpdate({ operation: "delete"}, {counter: 0});
    }
}
asyncCall();

/**
 * Require and use the event, category, original router.
 */
const eventRouter = require("./backend/routes/event-api");
app.use("/sidd/api/v1", eventRouter);

const categoryRouter = require("./backend/routes/category-api");
app.use("/api/v1/category/33306036", categoryRouter);

// const originalCategoryRouter = require("./backend/routes/event-category");
// app.use("/" , originalCategoryRouter);

// const originalEventRouter = require("./backend/routes/event");
// app.use("/" , originalEventRouter);

//for labels in html
const counters = require("./backend/routes/operation-api");
app.use("/count" , counters);

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


const Category = require("./backend/models/category");

// app.get("/" , async function (req, res) {
//     const firstCategory =await Category.findOne();
//     if (firstCategory == null){
//         res.render("index", {catID: ""});
//     }else{
//         console.log(firstCategory);
//         res.render("index", {catID: firstCategory.catId});
//     }
// });



