const mongoose = require("mongoose");

// Define the Schema
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String], // Array of strings
});

// Create and export the Model
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
