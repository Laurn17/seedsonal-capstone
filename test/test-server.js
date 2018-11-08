'use strict';

const chai = require("chai");
const chaihttp = require("chai-http");
const faker = require("faker");
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

const expect = chai.expect;

const { Produce } = require("../server/my-produce");
const { User } = require("../users");
const { app, runServer, closeServer } = require("../server");
const { JWT_SECRET, TEST_DATABASE_URL } = require("../config.js");


let token;


chai.use(chaihttp);


function seedProduceList(user) {
    token = jwt.sign(
      {
        user: {
            username: user.username
        }
      },
      JWT_SECRET,
      {
        algorithm: 'HS256',
        subject: user.username,
        expiresIn: '7d'
      }
    );
	const seedData = [];

    console.log('user id:', user._id);
	for (let i = 0; i <=10; i++) {
		seedData.push(generateProduceData(user._id));
	}
	return Produce.insertMany(seedData);
};

let produceData = {
    // username: 
	season: faker.random.arrayElement(['spring', 'summer', 'autumn', 'winter']),
	name: faker.random.word(),
	germinateIndoors: faker.random.boolean(),
	seedOrPlant: faker.random.arrayElement(['seed', 'plant']),
	plantBy: new Date()
};

const season = produceData.season;

function generateProduceData(userId) {
	return produceData;
	// return Object.assign({ username: userId }, produceData);
};

function createUser() {
    return User.create({ username: `${Math.random()}`, password: 'password' });
};

function tearDownDb() {
    	 return mongoose.connection.dropDatabase();

};

describe("Produce API resource", function() {
	before(function() {
		return runServer(TEST_DATABASE_URL);
	});

	beforeEach(function() {
        return createUser().then((user) => {
            return seedProduceList(user);
        })
	});

	afterEach(function() {
		return tearDownDb();
	});

    //5be0e664b3076c1567bdea5b
	after(function() {
		return closeServer();
	});


	describe("GET endpoint", function() {

		it("should return all existing Produce Lists", function() {
			let res;
            console.log('season', season);
			return chai
				.request(app)
				.get(`/${season}`)
				.set('Authorization', `Bearer ${token}`)
				.then(function(_res) {
					res = _res;
					expect(res).to.have.status(200);
					expect(res.body).to.have.lengthOf.at.least(1);
					return Produce.count();
				})
				.then(function(count) {
					expect(res.body).to.have.lengthOf(count);
				});
		});

		it("should return posts with the right fields", function() {
			let resProduce;
			return chai
				.request(app)
				.get(`/${season}`)
				.set('Authorization', `Bearer ${token}`)
				.then(function(res) {
					expect(res).to.have.status(200);
					expect(res).to.be.json;
					expect(res.body).to.be.a('array');
					expect(res.body).to.have.lengthOf.at.least(1);

					res.body.forEach(function(produce) {
						expect(produce).to.be.a("object");
						expect(produce).to.include.keys(
							"id", "name", "germinateIndoors", "seedOrPlant", "plantBy");
					});

					resProduce = res.body[0];
					return Produce.findById(resProduce.id);
				})
				.then(function(produce) {
					expect(resProduce.id).to.equal(produce.id)
					expect(resProduce.name).to.equal(produce.name);
					expect(resProduce.germinateIndoors).to.equal(produce.germinateIndoors);
					expect(resProduce.seedOrPlant).to.equal(produce.seedOrPlant);
					expect(resProduce.plantBy).to.equal(produce.plantBy.toDateString());
				});
		});
	});


	describe("PUT endpoint", function() {
		it("should update fields sent over", function() {
			const updateData = {
		 			germinateIndoors: true,
		 			seedOrPlant: "seed",
					plantBy: new Date("2018-12-30"),
			 		datePlanted: new Date("2018-12-30")	
		 		};

	 		return Produce
	 			.findOne()
	 			.then(function(produce) {
	 				updateData.id = produce.id;
	 				return chai
	 					.request(app)
	 					.put(`/${produce.id}`)
						.set('Authorization', `Bearer ${token}`)
	 					.send(updateData);
	 			})
	 			.then(function(res) {
	 				expect(res).to.have.status(204);
	 				expect(res.body).to.be.a("object");
	 				return Produce.findById(updateData.id);
	 			})
	 			.then(function(produce) {
	 				expect(produce.germinateIndoors).to.equal(updateData.germinateIndoors);
	 				expect(produce.seedOrPlant).to.equal(updateData.seedOrPlant);
	 				expect(produce.plantBy.toString()).to.equal(updateData.plantBy.toString());
					expect(produce.datePlanted.toString()).to.equal(updateData.datePlanted.toString());

	 			});
	 	});
 	});


	describe("DELETE endpoints", function() {
		it("should delete a post by id", function() {
			let produce;
			return Produce
				.findOne()
				.then(function(_produce) {
					produce = _produce;
					
					return chai
					.request(app)
					.delete(`/${produce.id}`)
					.set('Authorization', `Bearer ${token}`);
				})
				.then(function(res) {
					expect(res).to.have.status(204);
					return Produce.findById(produce.id);
				})
				.then(function(_produce) {
					expect(_produce).to.be.null;
				});
		});
	});

});

// describe("requesting root", function() {
//  it ("should return a 200 status code", function() {
//  	return chai
//  		.request(app)
//  		.get("/")
//  		.then(function(res) {
//  			expect(res).to.have.status(200);
//  		});
//  });
// });
