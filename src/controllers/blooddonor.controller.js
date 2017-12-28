var mongoose = require('mongoose');
var Blood = require("../models/blooddonor.model.js");
const faker = require('faker');
faker.locale = "vi";

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

exports.addBloodToDBFake = function (req, res) {
    var number = req.body.number;
    var jsonData = {
        status: 'OK',
        message: number+ ' document inserted successfully!!',
    }
    if (number)
        for (var i = 0; i < number; i++) {
            var User = {
                fullName: faker.name.findName(),
                email: faker.internet.email(),
                address: faker.address.streetAddress(),
                longitude: faker.finance.amount(105.734138, 105.901680, 8),
                latitude: faker.finance.amount(21.067942, 20.962822, 8),
                phone: faker.phone.phoneNumber(),
                age: faker.random.number(18, 60),
                bloodType: faker.random.arrayElement(["A", "B", "AB", "O"]),
                height: faker.random.number(150, 220),
                weight: faker.random.number(45, 100),
            }
            var bloodToSave = new Blood({
                ...User
            });
            bloodToSave.save(function (err, data) {
                if (err) {
                    res.send(err);
                }
            });
        };
    res.json(jsonData);
}