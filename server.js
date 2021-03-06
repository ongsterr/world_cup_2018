const express = require('express');
const bodyParser = require('body-parser');
const router = require('./backend/router');
const path = require('path')
require('dotenv').config();

const app = express();
const cors = require('cors');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Getting ready for production
app.use( express.static( `${__dirname}/frontend/build` ) );
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
});

app.use('/api/prediction', router);

app.get('/', (req, res) => {
  res.redirect('/api/prediction');
})

app.listen(port, () => console.log(`Listening on port ${port}`));