// Importing necessary libraries
const express = require('express');
const moment = require('moment');
const { ComponentDb, CountDb } = require('./db');
const router = express.Router();

// Route for adding new data
router.post('/addData', async function (req, res) {
  try {
    const id = req.body.componentId;
    const data = req.body.data;

    // Recording start time for performance measurement
    const startTime = moment();

    //delete Old entry
    await ComponentDb.deleteOne({ componentId: id });

    //create new entry
    const component = await ComponentDb.create({
      componentId: id,
      data: data,
    });

    const count = await CountDb.findOneAndUpdate(
      {},
      {
        $inc: { addCount: 1 },
      },
      { upsert: true, new: true }
    );
    // Recording end time for performance measurement
    const endTime = moment();
    // Calculating execution time
    const executionTime = moment
      .duration(endTime.diff(startTime))
      .asMilliseconds();
    console.log(`Execution time for Add API: ${executionTime.toFixed(2)} ms`);
    res
      .status(200)
      .json({ msg: 'New data added succesfully', component, count });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Something went wrong',
    });
  }
});

// Route for updating existing data
router.put('/updateData', async function (req, res) {
  try {
    const id = req.body.componentId;
    const data = req.body.data;
    // Recording start time for performance measurement
    const startTime = moment();
    // Finding existing component with given componentId
    const Comp = await ComponentDb.findOne({ componentId: id });

    // Updating data of existing component
    await ComponentDb.updateOne(
      {
        _id: Comp._id,
      },
      {
        data: data,
      }
    );

    // Updating count for updated data
    const count = await CountDb.findOneAndUpdate(
      {},
      {
        $inc: { updateCount: 1 },
      },
      { upsert: true, new: true }
    );

    // Finding updated component
    const Comp2 = await ComponentDb.findOne({ componentId: id });
    // Recording end time for performance measurement
    const endTime = moment();
    // Calculating execution time
    const executionTime = moment
      .duration(endTime.diff(startTime))
      .asMilliseconds();
    console.log(`Execution time for Add API: ${executionTime.toFixed(2)} ms`);
    res.status(200).json({
      msg: 'Data Updated Succesfully',
      Comp2,
      count,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Something went wrong',
    });
  }
});

// Route for getting count

router.get('/getCount', async function (req, res) {
  try {
    const count = await CountDb.findById({ _id: '663f53a15e8ab9c0a1926033' });

    // Sending response with count document
    res.status(200).json({ count });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Something went wrong',
    });
  }
});

module.exports = router;
