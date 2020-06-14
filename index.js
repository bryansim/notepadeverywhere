const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get('/api/:id', (req, res) => {
    let obj;
    let id = req.params.id;
    obj = JSON.parse(fs.readFileSync('data.json'));

    try {
      return res.send(`${obj[id].userText}`);
    } catch {
      //if no id, create a new one
      const fileName = './data.json';
      const file = require(fileName);
      file[id] = {'userText':''};
      console.log(file)
  
      fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(file));
        console.log('writing to ' + fileName);
      });
      return res.send('');
    };
  });
   
  app.post('/api/', (req, res) => { 
    return res.send('Received a POST HTTP method ');
  });
   
  app.put('/api', (req, res) => {

    //NOW WE NEED TO CHANGE THE RAW TEXT TO HANDLE A JSON, SO WE CAN CAPTURE MULTILINE INPUT CHANGE HERE AS WELL AS IN TEXTBOX.JS

    let id = req.query.id;
    let text = req.body; //req.query.text;

    console.log(req.body);
    const fileName = './data.json';
    const file = require(fileName);
    file[id]['userText'] = text['text'];

    fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
      if (err) return console.log(err);
      console.log(JSON.stringify(file));
      console.log('writing to ' + fileName);
    });

    return res.send(`Received a PUT HTTP method ${id} ${text}`);
  });
   
  app.delete('/api', (req, res) => {
    return res.send('Received a DELETE HTTP method');
  });
   
  app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`),
  );