const mongoose = require('./init');
const Schema = mongoose.Schema;

const predictionSchema = new Schema({
  game: String,
  homeResult: String,
  awayResult: String,
});

const predictionModel = mongoose.model('prediction', predictionSchema);

module.exports = predictionModel;