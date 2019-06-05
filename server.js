// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var cors = require('cors');
var cloudinary = require('cloudinary');

app.use(cors());

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

cloudinary.v2.api.resources(
  function(error, result){console.log(result);}
);


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/:folderName', function(request, response) {
  let folder = request.params.folderName
  let next = request.query.next
  cloudinary.v2.api.resources(
    {
      prefix: folder,
      type: 'upload',
      max_results: 12,
      next_cursor: next
    }, 
    function(error, result){
      response.send(result);
    }
  );
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
