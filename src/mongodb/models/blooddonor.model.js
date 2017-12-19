
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/blooddonor", { config: { autoIndex: false } }, function(error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

// a databse validation function
var nameValidation = function(val) {
    if (val == "") return false;
    else return true;
}

bloodSchema = new Schema({
    fullName: { type: String, required: true, validate: [nameValidation, "Name is required."] },
    address: String,
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    phone: String,
    age: Number,
    bloodType: { type: String, required: true, validate: [nameValidation, "Blood Type is required."] },
    height: Number,
    weight: Number,
})

bloodFilteringSchema = new Schema({
    longitudeMin: { type: Number, required: true },
    longitudeMax: { type: Number, required: true },
    latitudeMin: { type: Number, required: true },
    latitudeMax: { type: Number, required: true },
    ageFrom: { type: Number, required: true },
    ageTo: { type: Number, required: true },
    bloodType: { type: String, required: true, validate: [nameValidation, "Blood Type is required."] },
})

module.exports = mongoose.model("Blood", bloodSchema);