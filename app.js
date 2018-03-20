var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/node-mean");

app.use("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/addname", (req, res) => {
  var uTxt = new UserTxt(req.body);
  uTxt.save().then(item => {
    console.log('Saved.');
    res.send("Your text is now saved");
  }).catch(err => {
    console.log('error');
    res.status(400).send("We're sorry, we couldn't save this. Try again please.");
  });
});

app.listen(port, () => {
 console.log("Server listening on port " + port);
});

var nameSchema = new mongoose.Schema({
 name: String,
 txt: String
});

var UserTxt = mongoose.model("UserTxt", nameSchema);
