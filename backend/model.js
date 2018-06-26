const mongoose = require('./init');
const Schema = mongoose.Schema;

const predictionSchema = new Schema({
  user: String,
  game: String,
  homeResult: String,
  awayResult: String,
  winner: String,
});

// predictionSchema.pre('save', function(next) {
//   const homeResult = this.homeResult;
//   const awayResult = this.awayResult;

//   this.winner = homeResult > awayResult ? "Home" : (awayResult > homeResult ? "Away" : "Draw");
//   next();
// });

const predictionModel = mongoose.model('prediction', predictionSchema);

module.exports = predictionModel;