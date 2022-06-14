// Import Mongoose
const mongoose = require("mongoose");

// Schema definition
const NinjaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, "Name is required" ],
        minLength: [ 2, "Name must be at least 2 characters" ],
    },
    numProjects: {
        type: Number,
        required: [ true, "Number of projects is required" ],
        min: [ 0, "You can't have less that zero projects!" ],
    },
    gradDate: {
        type: Date,
        required: [ true, "Date is required" ],
        min: ['2012-01-01', "Date can't be before 2012" ]
    },
    isVeteran: {
        type: Boolean
    }
}, {timestamps: true})

// Declare model
const Ninja = mongoose.model("Ninja", NinjaSchema);

// Export model
module.exports = Ninja;