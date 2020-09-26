const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
const uri = "";
const client = new MongoClient(uri); 

const port = process.env.PORT || 5000;
client.connect();
app.use(bodyParser.json());

app.get('/api/:id', (req, res) => {
    //let obj;
    let id = req.params.id;

    async function findUser(id) {    
      try {
          result = await client.db("kopi").collection("words").findOne({ name: id })
            if (result) {
              console.log(`Found a listing in the collection with the name '${id}':`);
              } else {
                console.log(`No listings found with the name '${id}'`);
                const result = await client.db("kopi").collection("words").insertOne({"name":id});
                console.log(`New listing created with the following id: ${result.insertedId}`);
              }
            } catch (e) {
              console.error(e);
            } finally {
          return(result['text']);

    }}

   findUser(id).then(function(a){
    res.send(a)
    })
  
    
    /*obj = JSON.parse(fs.readFileSync('data.json')); //old stuff when I was using a JSON to store everything

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
    };*/

  });
   
  app.post('/api/', (req, res) => { 
    return res.send('Received a POST HTTP method ');
  });
   
  app.put('/api', (req, res) => {
    let id = req.query.id;
    let text = req.body; //req.query.text;

    async function updateUser(id_to_update, text_to_update) {
      console.log(text_to_update)
      try {
        result = await client.db("kopi").collection("words")
        .updateOne({ "name": id_to_update }, { $set: text_to_update} );
        console.log(`${result.matchedCount} document(s) matched the query criteria.`);
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
      } catch (e){
        console.error(e);
      } finally {
      }
  }

  updateUser(id, text).then(function(a){
    })

    //NOW WE NEED TO CHANGE THE RAW TEXT TO HANDLE A JSON, SO WE CAN CAPTURE MULTILINE INPUT CHANGE HERE AS WELL AS IN TEXTBOX.JS
    /*
    console.log(req.body);
    const fileName = './data.json';
    const file = require(fileName);
    file[id]['userText'] = text['text'];

    fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
      if (err) return console.log(err);
      console.log(JSON.stringify(file));
      console.log('writing to ' + fileName);
    });
    */

    return res.send(`Received a PUT HTTP method ${id} ${text}`);
  });
   
  app.delete('/api', (req, res) => {
    return res.send('Received a DELETE HTTP method');
  });
   
  app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`),
  );
