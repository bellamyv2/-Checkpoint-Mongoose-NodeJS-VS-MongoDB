require("dotenv").config();

const mongoose = require("mongoose");

const mongoUri = process.env.MONGO_URI;

if (mongoUri && !mongoUri.includes("<")) {
  // Mongoose 5 supports the connection options used by this exercise.
  mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((error) => {
      console.error("MongoDB connection failed:", error);
    });
} else {
  console.error(
    "Set a valid Atlas connection string in the private .env file as MONGO_URI.",
  );
}MONGO_URI=mongodb+srv://bellamyombaso2_db_user:<db_password>@b3llamy.uczbq9w.mongodb.net/

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = function (done) {
  const person = new Person({
    name: "John Doe",
    age: 30,
    favoriteFoods: ["pizza", "pasta"],
  });

  person.save(function (error, savedPerson) {
    done(error, savedPerson);
  });
};

const createManyPeople = function (arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (error, people) {
    done(error, people);
  });
};

const findPeopleByName = function (personName, done) {
  Person.find({ name: personName }, function (error, people) {
    done(error, people);
  });
};

const findOneByFood = function (food, done) {
  Person.findOne({ favoriteFoods: food }, function (error, person) {
    done(error, person);
  });
};

const findPersonById = function (personId, done) {
  Person.findById(personId, function (error, person) {
    done(error, person);
  });
};

const findEditThenSave = function (personId, done) {
  Person.findById(personId, function (error, person) {
    if (error) {
      return done(error);
    }

    if (!person) {
      return done(new Error("Person not found"));
    }

    person.favoriteFoods.push("hamburger");
    person.save(function (saveError, updatedPerson) {
      done(saveError, updatedPerson);
    });
  });
};

const findAndUpdate = function (personName, done) {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    function (error, updatedPerson) {
      done(error, updatedPerson);
    },
  );
};

const removeById = function (personId, done) {
  Person.findByIdAndRemove(personId, function (error, removedPerson) {
    done(error, removedPerson);
  });
};

const removeManyPeople = function (done) {
  Person.remove({ name: "Mary" }, function (error, result) {
    done(error, result);
  });
};

const queryChain = function (done) {
  Person.find({ favoriteFoods: "burritos" })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec(done);
};

module.exports = {
  Person,
  createAndSavePerson,
  createManyPeople,
  findPeopleByName,
  findOneByFood,
  findPersonById,
  findEditThenSave,
  findAndUpdate,
  removeById,
  removeManyPeople,
  queryChain,
};
