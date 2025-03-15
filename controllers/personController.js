const Person = require("../models/person");

// Function to create and save a person
const createPerson = async () => {
    try {
        const newPerson = new Person({
            name: "John Doe",
            age: 30,
            favoriteFoods: ["Pizza", "Burger"],
        });
        const savedPerson = await newPerson.save();
        console.log("Person saved:", savedPerson);
    } catch (err) {
        console.error("Error saving person:", err);
    }
};

// Function to create multiple people
const createManyPeople = async () => {
    try {
        const people = await Person.create([
            { name: "Alice", age: 25, favoriteFoods: ["Pasta", "Salad"] },
            { name: "Bob", age: 30, favoriteFoods: ["Steak", "Fries"] },
            { name: "Charlie", age: 35, favoriteFoods: ["Sushi", "Pizza"] },
        ]);
        console.log("People added:", people);
    } catch (err) {
        console.error("Error adding people:", err);
    }
};

// Function to find all people with a given name
const findPeopleByName = async (name) => {
    try {
        const people = await Person.find({ name });
        console.log(`People found with name ${name}:`, people);
    } catch (err) {
        console.error("Error finding people:", err);
    }
};

// Function to find one person by favorite food
const findPersonByFavoriteFood = async (food) => {
    try {
        const person = await Person.findOne({ favoriteFoods: food });
        console.log(`Person found who likes ${food}:`, person);
    } catch (err) {
        console.error("Error finding person:", err);
    }
};

// Function to find a person by _id
const findPersonById = async (personId) => {
    try {
        const person = await Person.findById(personId);
        console.log(`Person found with ID ${personId}:`, person);
    } catch (err) {
        console.error("Error finding person by ID:", err);
    }
};

// Function to update favoriteFoods by _id
const updateFavoriteFoods = async (personId) => {
    try {
        const person = await Person.findById(personId);
        if (!person) return console.log("Person not found.");

        person.favoriteFoods.push("hamburger");
        await person.save();
        console.log("Updated person:", person);
    } catch (err) {
        console.error("Error updating favoriteFoods:", err);
    }
};

// Function to update a person's age
const updatePersonAge = async (personName) => {
    try {
        const updatedPerson = await Person.findOneAndUpdate(
            { name: personName },
            { age: 20 },
            { new: true }
        );
        console.log("Updated person:", updatedPerson);
    } catch (err) {
        console.error("Error updating person age:", err);
    }
};

// Function to delete a person by _id
const deletePersonById = async (personId) => {
    try {
        const deletedPerson = await Person.findByIdAndRemove(personId);
        console.log("Deleted person:", deletedPerson);
    } catch (err) {
        console.error("Error deleting person:", err);
    }
};

// Function to delete multiple people by name
const deleteManyByName = async (name) => {
    try {
        const result = await Person.deleteMany({ name });
        console.log(`${result.deletedCount} people named "${name}" were deleted.`);
    } catch (err) {
        console.error("Error deleting people:", err);
    }
};

// Function to find people who like burritos, sorted by name, limited to 2, hiding age
const findPeopleWhoLikeBurritos = async () => {
    try {
        const people = await Person.find({ favoriteFoods: "burritos" })
            .sort({ name: 1 })
            .limit(2)
            .select("-age");

        console.log("People who like burritos:", people);
    } catch (err) {
        console.error("Error finding people:", err);
    }
};

// Export all functions
module.exports = {
    createPerson,
    createManyPeople,
    findPeopleByName,
    findPersonByFavoriteFood,
    findPersonById,
    updateFavoriteFoods,
    updatePersonAge,
    deletePersonById,
    deleteManyByName,
    findPeopleWhoLikeBurritos,
};
