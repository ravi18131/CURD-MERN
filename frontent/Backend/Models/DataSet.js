const mongoose = require('mongoose');

// Define the schema
const PriceVolumeSchema = new mongoose.Schema({
    priceNative: Number,
    priceUsd: Number,
    volume: {
        h24: Number,
        h6: Number,
        h1: Number,
        m5: Number
    }
});

// Create a model using the schema
const PriceVolumeModel = mongoose.model('PriceVolume', PriceVolumeSchema);

module.exports = PriceVolumeModel;
