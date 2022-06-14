// Import Ninja model
const Ninja = require("../models/ninja.model");

// Functions for routes
// Get all Ninjas function
module.exports.findAllNinjas = ( req, res ) => {
    Ninja.find()
        .then( allNinjas => {
            res.json({ results: allNinjas });
        })
        .catch(err => {
            res.json({
                response: "Something went wrong",
                error: err
            });
        })
}

// Get one Ninja function
module.exports.findOneNinja = ( req, res ) => {
    Ninja.findOne({ _id: req.params.id })
    .then( oneNinja => {
        res.json({ results: oneNinja });
    })
    .catch(err => {
        res.json({
            response: "Something went wrong",
            error: err
        });
    })

}

// Create new Ninja function
module.exports.createNinja = ( req, res ) => {
    Ninja.create(req.body)
        .then( newNinja => {
            res.json({ results: newNinja })
        })
        .catch(err => {
            res.json({
                response: "Something went wrong",
                error: err
            });
        })
}

// Update Ninja function
module.exports.updateNinja = ( req, res ) => {
    Ninja.findOneAndUpdate(
        { _id: req.params.id }, // Specify which item to update
        req.body, // Specify what data to update with
        { new: true, runValidators: true } // Rerun validators on new data, and return the updated object
        )
        .then( updatedNinja => {
            res.json({ results: updatedNinja });
        })
        .catch(err => {
            res.json({
                response: "Something went wrong",
                error: err
            });
        })
}

// Delete Ninja function
module.exports.deleteNinja = ( req, res ) => {
    Ninja.findOneAndDelete({ _id: req.params.id })
        .then( deletedNinja => {
            res.json({
                document: deletedNinja,
                status: "deleted"
            })
        })
        .catch(err => {
            res.json({
                response: "Something went wrong",
                error: err
            });
        })
}
