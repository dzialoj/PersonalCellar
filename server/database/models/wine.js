const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

const wineSchema = new Schema({
    userid: { type: String, unique: false, required: false },
    name: { type: String, unique: false, required: false },
    vintage: {type: String, unique: false, required: false },
    country: { type: String, unique: false, required: false },
    region: { type: String, unique: false, required: false },
    varietal: { type: String, unique: false, required: false },
    pairing: { type: String, unique: false, required: false },
    notes: { type: String, unique: false, require: false },
    quantity: { type: Number, unique: false, required: false },
    cellocation: { type: String, unique: false, required: false },
})

const Wine = mongoose.model('Wine', wineSchema)
module.exports = Wine