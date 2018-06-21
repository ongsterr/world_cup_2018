const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
require('dotenv').config();

const app = express();
const cors = require('cors');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/prediction', router);

app.get('/', (req, res) => {
  res.redirect('/api/prediction');
})

app.listen(port, () => console.log(`Listening on port ${port}`));