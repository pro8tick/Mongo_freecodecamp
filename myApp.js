require('dotenv').config();

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});


let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let newPerson = new Person({ name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"] })
  newPerson.save(function(err, data) {
    err ? console.log(err) : done(null, data)

  })
};

// var arrayOfPeople = [
//   {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
//   {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
//   {name: "Robert", age: 78, favoriteFoods: ["wine"]}
// ];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople).then((doc) => {
    done(null, doc);
  })
    .catch((err) => {
      console.error(err);
    });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }).then(data => {
    done(null, data);

  }).catch(err => console.log(err))
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }).then(data => {
    done(null, data);
  }).catch(err => console.log(err))
};

const findPersonById = (personId, done) => {
  Person.findById(personId).then(data => {
    done(null, data);

  }).catch(err => console.log(err))
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId)
    .then(person => {

      person.favoriteFoods.push(foodToAdd)

      person.save((err, updatedPerson) => {
        if (err) return console.log(err);
        done(null, updatedPerson)
      })
    }).catch(err => console.log(err))

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new: true}).then(data=>{
    done(null, data);
  }).catch(err => console.log(err))  
};

const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId).then(data => {
    done(null, data);

  }).catch(err => console.log(err))
};

const removeManyPeople = (done) => {
  Person.remove().then((obj) => {
    done(null, obj);

  }).catch(err => console.log(err))
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec(function(error, people) {
    if(error) return console.log(error)
    else {
      done(null,people)
    }
  });
};

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
