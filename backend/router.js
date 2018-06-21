const express = require('express');
const Prediction = require('./model');
const router = express.Router();

router.get('/', (req, res) => {
  Prediction.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({error: err.message});
    });
})

router.post('/', (req, res) => {
  const prediction = new Prediction(req.body);

  prediction.save()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({error: err.message});
    });
})

module.exports = router;