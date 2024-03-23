const express = require('express');
const router = express.Router();
const PriceVolumeModel = require('../Models/DataSet')


router.get('/getdata', async (req, res) => {
    try {
        const priceVolumes = await PriceVolumeModel.find();
        res.json(priceVolumes);
    } catch (error) {
        console.error('Error fetching price volumes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/getdataById/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);        
        // Find the data by ID in the database
        const priceVolume = await PriceVolumeModel.findById(id);

        // Check if data with the given ID exists
        if (!priceVolume) {
            return res.status(404).json({ error: 'Data not found' });
        }

        // If data exists, return it in the response
        res.json(priceVolume);
    } catch (error) {
        console.error('Error fetching data by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/postdata', async (req, res) => {
    try {
        const { priceNative, priceUsd, volume } = req.body;
        const newPriceVolume = new PriceVolumeModel({ priceNative, priceUsd, volume });
        const savedPriceVolume = await newPriceVolume.save();
        res.status(201).json(savedPriceVolume);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/updatedata/:id', async (req, res) => {
    
    try {
        // Find the data by ID
        const { id } = req.params;
        console.log(id); // Check if the ID is correctly received
        const priceVolume = await PriceVolumeModel.findByIdAndUpdate(
            {_id : id}, req.body, {new:true}
        );

        res.status(200).json({ message: 'Data updated successfully'+ priceVolume });
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.delete('/deletedata/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await PriceVolumeModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
        console.error('Error deleting price volume:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
