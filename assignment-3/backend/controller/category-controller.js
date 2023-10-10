const Event = require("../models/event");
const Category = require("../models/category");
const statsController = require("../controller/stats")

module.exports = {

    addCategory: async (req, res) => {
        try {

            console.log("Request body:", req.body);
            let aCategory = new Category({catId: req.body.catId, name: req.body.name, description: req.body.description, image: req.body.image, eventsList: req.body.eventsList});
            await aCategory.save();
            console.log("Category saved:", aCategory);
            res.status(200).json({category: aCategory.catId});
        } catch (error) {
            res.status(400).json({error: "Invalid Data"});

        }
    },


    addEventToCategory: async (req, res) => {
        try {
            const {categoryId, eventId} = req.body;
            const category = await Category.findOne({catId: categoryId});
            const event = await Event.findOne({eventId: eventId});
            category.eventsList.push(event._id);
            await category.save();
            statsController.incrementCounter('add');
            res.status(200).json({message: 'Event added successfully'});
        } catch (error) {
            res.status(400).json({error: "Invalid Data"});

        }
    },


    listCategory: async (req, res) => {
        try {
            let categories = await Category.find({}).populate({path: 'eventsList', model: 'Event'});
            res.json(categories);
        } catch (error) {
            res.status(400).json({error: "Invalid Data"});
        }
    },

    displayCategory: async (req, res) => {
        console.log("displayCategory", req.params)
        try {
            const showCategoryId = req.params.catId;
    
            if (showCategoryId == undefined) {
                const category = await Category.findOne({ catId: showCategoryId }).populate('eventsList');
                const event = await Event.find({});
                res.json({ category, event });
            } else {
                const category = await Category.findOne({ catId: showCategoryId }).populate('eventsList');
    
                if (category == null) {
                    return res.status(404).json({ error: 'Category not found' });
                }
                const event = await Event.find({});
                res.json({ category, event });
            }
        } catch (error) {
            console.error(error);
            res.status(400).json({error: "Invalid Data"});
        }
    },
    



    deletingCategory: async function (req, res) {
        try {
            let categoryID = req.params.catId;
            let aCategory = await Category.findOne({catId: categoryID});
            console.log('Received categoryID:', categoryID);
            if (! aCategory) {
                return res.status(404).json({"status": "Category not found"});
            }
            // finding events that have the categoryID
            const events = await Event.find({categoryList: aCategory._id});

            for (const event of events) { // finding event from events array,remove category from event's category list
                const index = event.categoryList.indexOf(aCategory._id);
                if (index !== -1) {
                    event.categoryList.splice(index, 1);
                    await event.save();
                }
            }
            // deleting event and category
            const deletingEvent = events.map((event) => event._id);
            await Event.deleteMany({
                _id: {
                    $in: deletingEvent
                }
            });
            const deletedCategory = await Category.deleteOne({_id: aCategory._id});
            statsController.incrementCounter('delete');
            res.status(200).json(deletedCategory);

        } catch (error) {
            res.status(400).json({error: "Invalid Data"});
        }
    },


    updateCategory: async function (req, res) {
        try {
            let categoryID = req.body.catId;
            let name = req.body.name;
            let description = req.body.description;
            console.log('Received categoryID:', categoryID);
            console.log('Received request body:', req.body);


            let updatedCategory = await Category.findOneAndUpdate({
                catId: categoryID
            }, {
                name: name,
                description: description
            });
            statsController.incrementCounter('update');

            if (! updatedCategory) {
                return res.json({"status": "CategoryID not found"});
            } else {
                res.status(200).json({"status": "updated successfully"});
            }
        } catch (error) {
            res.status(400).json({error: "Invalid Data"});
        }
    }


}
