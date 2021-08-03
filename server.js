const {makeId} =  require('./src/utils/ServerUtils');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {writeToStorage} = require("./src/storage/FileStorage");
const {getUrlRecord} = require('./src/storage/FileStorage')


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/url', async (req, res) => {
  try {
     const urls = await getUrlRecord(req.query.shortUrl);
    res.send(urls);
    }
    catch (err){
      res.status(500).json({error:err.message});
    }
});

app.post('/api/url/generate', async (req, res) => {
  const longUrl =  req.body.longUrl;
  if(!longUrl){
    res.status(400).json({error:'Long url is missing'});
    return;
  }else{
    try {
      const id = makeId(6)
      const shortUrl = id;
      const timesVisited = 0;
      const model = {shortUrl, longUrl, timesVisited};
      await writeToStorage(model);
      res.status(200).json(model);
    }
    catch(err){
      res.status(500).json({error:err.message});
    }
  }
});

app.post('/api/url/update', async (req, res) => {
  try {
    const model = await getUrlRecord(req.body.shortUrl);
    model.timesVisited = model.timesVisited + 1;
    await writeToStorage(model);
    res.status(200).json(model);
  }
  catch(err){
    res.status(500).json({error:err.message});
  }

});

  // Serve any static files
  app.use(express.static(path.join(__dirname, 'build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });



app.listen(port, () => console.log(`Listening on port ${port}`));