var express     = require('express');
var app         = express();
var bodyParser  = require("body-parser");
var firebase    = require('firebase');

// Initialize
var config = {
    apiKey: "AIzaSyAaleMl9tDYwXptm7DtNHgsL-4GCcgQ5VA",
    authDomain: "fakethat-ffc35.firebaseapp.com",
    databaseURL: "https://fakethat-ffc35.firebaseio.com/",
    storageBucket: "fakethat-ffc35.appspot.com"
  };
  firebase.initializeApp(config);

var ref = firebase.database().ref('news_channels');
// ref.push({
//     name: 'Aaj Tak'
// });

var all = [];
ref.on('value', function(snapshot){
    snapshot.forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      var key = childSnapshot.key;
      // console.log(key);
      // childData will be the actual contents of the child
      var childData = childSnapshot.val();
       // console.log(childData);
      all.push(childData);
      // console.log(all);
  });
});

    // .then(function(snap){
    //     console.log(snap.key);
    // });

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render("landing.ejs", {all: all});
});

app.get("/home", function(req, res){
    var all = [];
    ref.on('value', function(snapshot){
    snapshot.forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      var key = childSnapshot.key;
      // console.log(key);
      // childData will be the actual contents of the child
      var childData = childSnapshot.val();
       // console.log(childData);
      all.push(childData);
      // console.log(all);
     });
    // console.log(all[1].name);
    res.render("home.ejs", {all: all});
    });

});

app.get("/fake/:name", function(req, res){
    var name = req.params.name;
    ref.on('value', function(snapshot){
    snapshot.forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      var key = childSnapshot.key;
      // console.log(key);
      // childData will be the actual contents of the child
      var channel = childSnapshot.val();
       // console.log(childData);
      if(channel.name == name) res.render("fake.ejs", {channel: channel});
      // console.log(all);
     });

});
});

app.listen(3000);
