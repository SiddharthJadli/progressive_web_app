const Event = require("../models/event");
const Category = require("../models/category");
const statsController = require("../controller/stats")

module.exports = {
	insertEvent: async function (req, res) {
		try {
            let anEvent = new Event({ name: req.body.name, description: req.body.description, startTime: req.body.startTime, duration: req.body.duration, capacity: req.body.capacity, availableTickets: req.body.availableTickets, categories: req.body.categories});   
        
            //Splitting user input
            let categoryIDList = req.body.categories.split(",");
            
            let i=0;
            //Removing any whitespace in the array elements
            categoryIDList.forEach(categoryID => {
                categoryIDList[i] = categoryID.trim();
                i++;
            });

            const category = await Category.find({catId: {$in: categoryIDList}});
            anEvent.categoryList = category;

            await anEvent.save();

            statsController.incrementCounter('add');

            res.json(anEvent.eventId);
        } catch(err){
            console.log(err.message);
            res.status(400).json({error: "Invalid Data"});
        }
	},

    listEvents: async function (req, res) {
		let events = await Event.find({}).populate("categoryList");
        res.json(events);
    },

    updateEvent: async function (req, res) {
		try{
            let eventID = req.body.eventID;
            let name = req.body.name;
            let capacity = req.body.capacity;

            if(await Event.findOne({eventId: eventID}) == null){
                res.status(404).json({
                    "status": "Event ID not found",
                })
            } else {
                let updatedEvent = await Event.findOneAndUpdate({eventId: eventID},{name: name, capacity: capacity});

                statsController.incrementCounter('update');

                res.status(200).json({
                    "status": "updated successfully"
                })
            }
        } catch{
            res.status(400).json({error: "Invalid Data"});
        }
    },

	deleteEvent: async function (req, res) {
        try {
            let eventID = req.params.eventId; 
    
            let anEvent = await Event.findOne({ eventId: eventID });
    
            // Remove the event from the associated categories
            for (let i = 0; i < anEvent.categoryList.length; i++) {
                let categoryID = anEvent.categoryList[i];
                let category = await Category.findById(categoryID);
    
                if (category) {
                    category.eventsList = category.eventsList.filter(
                        (eventId) => eventId.toString() !== anEvent._id.toString()
                    );
                    await category.save();
                }
            }
    
            let deletedEvent = await Event.deleteOne({ eventId: eventID });
    
            statsController.incrementCounter('delete');
    
            res.status(200).json(deletedEvent);
        } catch {
            res.status(400).json({ error: "Invalid Data" });
        }
    },
    

    displayEvent: async (req, res) => {
        try {
            let eventID = req.params.eventId;
            let anEvent = await Event.find({eventId: eventID}).populate({path: 'categoryList', model: 'Category'});
            res.json(anEvent);
        } catch (error) {
            res.status(400).json({error: "Invalid Data"});
        }
    },
}