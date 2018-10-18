// MY LIST OF PRODUCE SCHEMA 
'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const produceSchema = mongoose.Schema({
// Userid:
// season:
// name: {type: String, required: true},
// Germinate Indoors:" checkbox,
// Seed or Plant:" radio button,
// Plant By:" date input,
// Date Planted:" date input

// });



produceSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.authorName,
    content: this.content,
    title: this.title,
    created: this.created
  };
};

// const Produce = mongoose.model('Produce', produceSchema);
// module.exports = {Produce};