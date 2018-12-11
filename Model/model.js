let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let inputdata = new Schema({
    name: String,
    price: String,
    rating: Number,
    review_count: Number,
    url: String,
    image: String,
    display_phone: String,
    display_address: String,
    feeling: Boolean,

  
})

 model = mongoose.model('model', inputdata);

module.exports = model;