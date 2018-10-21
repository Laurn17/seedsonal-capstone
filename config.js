'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/seedsonal-capstone';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/seedsonal-capstone';
exports.PORT = process.env.PORT || 27017;
exports.JWT_SECRET = process.env.JWT_SECRET || 'testing';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';