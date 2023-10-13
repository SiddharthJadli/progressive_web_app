const Event = require("../models/event");
const Category = require("../models/category");
const statsController = require("../controller/stats")

module.exports = {

    addCategory: async (req, res) => {
        try {

            console.log("Request body:", req.body);
            let aCategory = new Category({catId: req.body.catId, name: req.body.name, description: req.body.description, image: req.body.image, eventsList: req.body.eventsList});
            await aCategory.save();
            statsController.incrementCounter('add');
            res.status(200).json({category: aCategory.catId});
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
        try {
          const showCategoryId = req.params.catId;
          numberOfCategories = await Category.countDocuments();
          if (numberOfCategories === 0) {
            return res.status(404).json({ error: "Page not found" });
          }
      
          if (showCategoryId === undefined) {
            const categories = await Category.find({}).populate('eventsList');
            return res.json(categories);
          } else {
            const category = await Category.findOne({ catId: showCategoryId }).populate('eventsList');
      
            if (category == null) {
              return res.status(404).json({ error: "Category not found" });
            } else {
              const events = await Event.find({ _id: { $in: category.eventsList } });
              return res.json({ category, events });
            }
          }
        } catch (error) {
          console.error(error);
          return res.status(400).json({ error: "Invalid data" });
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
                // if there is >1 event in a category
                if (event.categoryList.length >1) {
                    const index = event.categoryList.indexOf(aCategory._id);
                    if (index !== -1)  {
                        event.categoryList.splice(index, 1);
                        await event.save();
                    }
                } else {
                    await Event.deleteOne({_id: event._id});
                }
            }

            // deleting category
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
            let image = req.body.image;

            console.log('Received categoryID:', categoryID);
            console.log('Received request body:', req.body);


            let updatedCategory = await Category.findOneAndUpdate({
                catId: categoryID
            }, {
                name: name,
                description: description,
                image: image
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
