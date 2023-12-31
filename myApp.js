require('dotenv').config();
let mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

let Person;

const personSchema = new mongoose.Schema({
  name: {
    type: String
  },
  age: Number,
  favoriteFoods: [String]
})

Person = mongoose.model('Person', personSchema)

const createAndSavePerson = (done) => {
  let document = Person({
    name: 'Pedro',
    age: 27,
    favoriteFoods: ['pizza', 'tacos']
  });

  document.save((err, data) => {
    if (err) {
      console.log(`Error al crear el registro ${err}`);
    } else {
      done(null, data);
    }
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) {
      console.log(err)
    } else {
      done(null, data)
    }
  });

}

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, data) {
    if (err) {
      console.log(err)
    } else {
      done(null, data);
    }
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) {
      console.log(err)
    } else {
      done(null, data);
    }
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) {
      console.log(err)
    } else {
      done(null, data);
    }
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function (err, person) {
    if (err) console.log(err)
    console.log('person: ', person);
    person.favoriteFoods.push(foodToAdd)
    person.save((err, data) => {
      if (err) { console.log(err) } else { done(null, data) }
    });
  })

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOne({ name: personName }, function (err, person) {
    person.age = ageToSet
    person.save((err, data) => {
      if (err) { console.log(err) } else done(null, data);
    })
  }, { new: true })
}

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, data) {
    if (err) { console.log(err) } else done(null, data)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, function (err, data) {
    console.log(data)
    if (err) { console.log(err) } else done(null, data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch }).sort({name:1}).limit(2).select({age:0}).exec(function(err,data){if(err){console.log(err)}else done(null,data)});
}

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
