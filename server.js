require("dotenv").config();
const mongoose = require("mongoose");
const personController = require("./controllers/personController");

// Connect to MongoDB first
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB connected");

        // Run functions only after a successful connection
        personController.createPerson();
        personController.createManyPeople();
        personController.findPeopleByName("Alice");
        personController.findPersonByFavoriteFood("Pizza");
        personController.findPersonById("65a123456789abcd1234ef56"); // Example ID
        personController.updateFavoriteFoods("65a123456789abcd1234ef56"); // Example ID
        personController.updatePersonAge("John Doe");
        personController.deletePersonById("65d123abc456def789ghi012"); // Example ID
        personController.deleteManyByName("Mary");
        personController.findPeopleWhoLikeBurritos();
    })
    .catch((err) => console.error("MongoDB connection error:", err));
