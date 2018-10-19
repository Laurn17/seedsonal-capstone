'use strict';

const chai = require("chai");
const chaihttp = require("chai-http");
const faker = require("faker");
const mongoose = require("mongoose");

const expect = chai.expect;

const { Produce } = require("../server/my-produce");
const { app, runServer, closeServer } = require("../server");
const { JWT_SECRET, TEST_DATABASE_URL } = require("../config.js");

chai.use(chaihttp);

// STILL NEED TONS MORE TEST FUNCTIONS

// describe("???? resource", function() {
// 	before(function() {
// 		return runServer(TEST_DATABASE_URL);
// 	});

// 	beforeEach(function() {
// 		return seedBlogPosts();
// 	});

// 	afterEach(function() {
// 		return tearDownDb();
// 	});

// 	after(function() {
// 		return closeServer();
// 	});


describe("requesting root", function() {
 it ("should return a 200 status code", function() {
 	return chai
 		.request(app)
 		.get("/")
 		.then(function(res) {
 			expect(res).to.have.status(200);
 		});
 });
});