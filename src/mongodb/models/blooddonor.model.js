var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var configs = require('../configs');
var env = process.env.NODE_ENV || 'development';
var mongodbURI = env === 'development' ? configs.MONGO_LOCAL_URI : configs.MONGO_PROD_URI;

mongoose.connect(mongodbURI, { config: { autoIndex: false } }, function(error) {
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
    email: { type: String, required: true, validate: [nameValidation, "Email is required."] },
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