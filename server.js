const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const path = require('path')
require('dotenv').config();

const app = express();
const cors = require('cors');
const dirname = process.env.ROOT;

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Getting ready for production
app.use( express.static( `${dirname}/build` ) );
app.get('/', (req, res)=>{
  res.sendFile(path.join(dirname, '/build/index.html'));
});

app.use('/api/prediction', router);

app.get('/', (req, res) => {
  res.redirect('/api/prediction');
})

app.listen(port, () => console.log(`Listening on port ${port}`));