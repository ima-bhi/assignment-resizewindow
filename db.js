// Importing mongoose library
const mongoose = require('mongoose');

// Connecting to MongoDB Atlas database
mongoose
  .connect(
    'mongodb+srv://lync:lync@assignment.mblzlli.mongodb.net/',
    { useNewUrlParser: true, useUnifiedTopology: true } // Adding options object
  )
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

// Defining schema for component collection
const componentSchema = new mongoose.Schema({
  componentId: String,
  data: { type: String, required: true },
});

// Defining schema for count collection
const countSchema = new mongoose.Schema({
  addCount: {
    type: Number,
    default: 0,
  },
  updateCount: {
    type: Number,
    default: 0,
  },
});

const ComponentDb = mongoose.model('ComponentDb', componentSchema);
const CountDb = mongoose.model('CountDb', countSchema);

// Exporting models
module.exports = {
  ComponentDb,
  CountDb,
};
