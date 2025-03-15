const Person = require("../models/person");

// Function to create and save a person
const createPerson = async () => {
    const newPerson = new Person({
        name: "John Doe",
        age: 30,
        favoriteFoods: ["Pizza", "Burger"],
    });

    try {
        const savedPerson = await newPerson.save();
        console.log("Person saved:", savedPerson);
    } catch (err) {
        console.error("Error saving person:", err);
    }
};

module.exports = { createPerson };

// Function to create multiple people
const createManyPeople = async () => {
    const arrayOfPeople = [
        { name: "Alice", age: 25, favoriteFoods: ["Pasta", "Salad"] },
        { name: "Bob", age: 30, favoriteFoods: ["Steak", "Fries"] },
        { name: "Charlie", age: 35, favoriteFoods: ["Sushi", "Pizza"] },
    ];

    try {
        const people = await Person.create(arrayOfPeople);
        console.log("People added:", people);
    } catch (err) {
        console.error("Error adding people:", err);
    }
};

module.exports = { createManyPeople };

// Function to find all people with a given name
const findPeopleByName = async (name) => {
    try {
        const people = await Person.find({ name: name });
        console.log(`People found with name ${name}:`, people);
    } catch (err) {
        console.error("Error finding people:", err);
    }
};

module.exports = { findPeopleByName };

// Function to find one person by favorite food
const findPersonByFavoriteFood = async (food) => {
    try {
        const person = await Person.findOne({ favoriteFoods: food });
        console.log(`Person found who likes ${food}:`, person);
    } catch (err) {
        console.error("Error finding person:", err);
    }
};

module.exports = { findPersonByFavoriteFood };

// Function to find a person by _id
const findPersonById = async (personId) => {
    try {
        const person = await Person.findById(personId);
        console.log(`Person found with ID ${personId}:`, person);
    } catch (err) {
        console.error("Error finding person by ID:", err);
    }
};

module.exports = { findPersonById };

// Function to find a person by _id, update favoriteFoods, and save
const updateFavoriteFoods = async (personId) => {
    try {
        const person = await Person.findById(personId);
        if (!person) {
            console.log("Person not found.");
            return;
        }

        // Add "hamburger" to favoriteFoods array
        person.favoriteFoods.push("hamburger");

        // Mark array as modified (important for some cases)
        person.markModified("favoriteFoods");

        // Save the updated document
        const updatedPerson = await person.save();
        console.log("Updated person:", updatedPerson);
    } catch (err) {
        console.error("Error updating favoriteFoods:", err);
    }
};

module.exports = { updateFavoriteFoods };

// Function to find a person by name and update their age to 20
const updatePersonAge = async (personName) => {
    try {
        const updatedPerson = await Person.findOneAndUpdate(
            { name: personName }, // Search by name
            { age: 20 }, // Update age to 20
            { new: true } // Return updated document
        );

        if (!updatedPerson) {
            console.log("Person not found.");
            return;
        }

        console.log("Updated person:", updatedPerson);
    } catch (err) {
        console.error("Error updating person age:", err);
    }
};

module.exports = { updatePersonAge };

// Function to delete a person by their _id
const deletePersonById = async (personId) => {
    try {
        const deletedPerson = await Person.findByIdAndRemove(personId);

        if (!deletedPerson) {
            console.log("Person not found.");
            return;
        }

        console.log("Deleted person:", deletedPerson);
    } catch (err) {
        console.error("Error deleting person:", err);
    }
};

module.exports = { deletePersonById };

// Function to delete all people named "Mary"
const deleteManyByName = async (name) => {
    try {
        const result = await Person.deleteMany({ name: name });

        console.log(`${result.deletedCount} people named "${name}" were deleted.`);
    } catch (err) {
        console.error("Error deleting people:", err);
    }
};

module.exports = { deleteManyByName };

// Function to find people who like burritos, sort by name, limit to 2, and hide age
const findPeopleWhoLikeBurritos = async () => {
    try {
        const people = await Person.find({ favoriteFoods: "burritos" }) // Find people who like burritos
            .sort({ name: 1 }) // Sort by name (ascending)
            .limit(2) // Limit results to 2
            .select("-age") // Hide the age field
            .exec(); // Execute query

        console.log("People who like burritos:", people);
    } catch (err) {
        console.error("Error finding people:", err);
    }
};

module.exports = { findPeopleWhoLikeBurritos };
