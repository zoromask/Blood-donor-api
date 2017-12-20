var mongoose = require('mongoose');
var Blood = require("./models/blooddonor.model.js");

exports.index = function(req, res) {
    bloodQuery = Blood.find({});
    bloodQuery.sort('-fullName');

    bloodQuery.exec(function(err, data) {
        if (err) {
            return res.status(500).send("There was an error on the blood query");
        }

        var jsonData = {
            status: 'OK',
            blood: data
        };
        res.json(jsonData);
    })
}

exports.oneBlood = function(req, res) {
    var requestBloodId = req.params.id;

    Blood.findById(requestBloodId, function(err, data) {
        if (err) {
            return res.status(500).send("There was an error on the blood query");
        }

        if (data == null) {
            return res.status(404).send("couldn't find that blood!");
        }

        var templateData = {
            status: 'OK',
            blood: data,
        };

        res.json(templateData);
    });
}

exports.addBloodToDB = function(req, res) {
    var bloodToSave = new Blood({
        fullName: req.body.fullName.trim(),
        email: req.body.email.trim(),
        address: req.body.address,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        phone: req.body.phone,
        age: req.body.age,
        bloodType: req.body.bloodType.trim(),
        height: req.body.height,
        weight: req.body.weight,
    });
    bloodToSave.save(function(err, data) {
        if (err) {
            res.send(err);
        }
        var jsonData = {
            status: 'OK',
            message: '1 document inserted successfully!!',
            blood: data
        }
        res.json(jsonData);
    });
}

exports.updateBloodToDB = function(req, res) {
    var requestBloodId = mongoose.Types.ObjectId(req.params.id);
    var bloodToUpdate = {};

    Object.assign(bloodToUpdate, {
        fullName: req.body.fullName.trim(),
        email: req.body.email.trim(),
        address: req.body.address,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        phone: req.body.phone,
        age: req.body.age,
        bloodType: req.body.bloodType.trim(),
        height: req.body.height,
        weight: req.body.weight,
    });

    Blood.update({ _id: requestBloodId }, bloodToUpdate, function(err, data) {
        if (err) {
            console.log(requestBloodId);
            res.send(err);
        }

        if (data == null) {
            console.error("unable to find food: " + data._id);
            res.status(404).send("couldn't find that blood!" + requestBloodId);
        }
        var jsonData = {
            status: 'OK',
            message: '1 document updated successfully!!',
            blood: data
        }
        res.json(jsonData);
    });
}

exports.filterBlood = function(req, res) {
    Blood.find({})
        .where('bloodType').equals(req.query.bloodType)
        .where('age').gte(+req.query.ageFrom).lte(+req.query.ageTo)
        .where('latitude').gte(+req.query.latitudeMin).lte(+req.query.latitudeMax)
        .where('longitude').gte(+req.query.longitudeMin).lte(+req.query.longitudeMax)
        .sort('-fullName')
        .exec(function(err, data) {
            if (err) {
                res.send(err);
            }
            var jsonData = {
                status: 'OK',
                blood: data
            }
            res.json(jsonData);
        });
}

exports.getByEmail = function(req, res) {
    var emailQuery = req.query.email.trim();
    Blood.find({}).where('email').equals(emailQuery).exec(function(err, data) {
        if (err) {
            res.send(err);
        }
        var jsonData = {
            status: 'OK',
            blood: data
        }
        res.json(jsonData);
    })
}