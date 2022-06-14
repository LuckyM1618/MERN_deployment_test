// Import mongoose
const mongoose = require("mongoose");

// *CHANGE DATABASE NAME HERE
const db_name = "belt_reviewer_db";

// Connect to Mongo DB using mongoose
mongoose.connect(`mongodb://localhost/${db_name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Established a connection to the database'))
    .catch(err => console.log('Something went wrong when connecting to the database ', err));