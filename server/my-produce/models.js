// MY LIST OF PRODUCE SCHEMA 
'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const produceSchema = mongoose.Schema({
	season: {type: String, required: true},
	name: {type: String, required: true},
	germinateIndoors: {type: Boolean},
	seedOrPlant: {type: String, enum: ['seed', 'plant']},
	plantBy: {type: Date, required: true},
	datePlanted: {type: Date},
	username: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});



produceSchema.methods.serialize = function() {
  return {
    id: this._id,
    season: this.season,
    name: this.name,
    germinateIndoors: this.germinateIndoors,
    seedOrPlant: this.seedOrPlant,
    plantBy: this.plantBy.toDateString(),
    datePlanted: this.datePlanted && this.datePlanted.toDateString()
  };
};

const Produce = mongoose.model('Produce', produceSchema);
module.exports = {Produce};