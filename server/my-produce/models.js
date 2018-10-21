// MY LIST OF PRODUCE SCHEMA 
'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const produceSchema = mongoose.Schema({
	username: {type: String, required: true},
	// season: DO i need this?
	name: {type: String, required: true},
	germinateIndoors: {type: Boolean},
	seedorPlant: radio button, WHAT TYPE IS A RADIO BUTTON??
	plantBy: {type: Date, required: true},
	datePlanted: {type: Date}
});



produceSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    germinateIndoors: this.germinateIndoors,
    seedorPlant: this.seedorPlant,
    plantBy: this.plantBy.toDateString(),
    datePlanted: this.datePlanted.toDateString()
  };
};

const Produce = mongoose.model('Produce', produceSchema);
module.exports = {Produce};