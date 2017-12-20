const faker = require('faker');
faker.locale = "vi";

const User = {
    fullName: faker.name.findName(),
    email: faker.internet.email(),
    address: faker.address.streetAddress(),
    longitude: faker.address.longitude(),
    latitude: faker.address.latitude(),
    phone: faker.phone.phoneNumber(),
    age: faker.random.number(18, 60),
    bloodType: faker.random.arrayElement(["A", "B", "AB", "O"]),
    height: faker.random.number(150, 220),
    weight: faker.random.number(45, 100),
}

module.exports = User