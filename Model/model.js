let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let inputdata = new Schema({
    name: String,
    type: String,
    image: Array,
    website: String,
    rating: String,
    price: String,
    phone: String,
})

 model = mongoose.model('model', inputdata);

module.exports = model;