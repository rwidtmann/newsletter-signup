//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/testApp", function(req, res) {
  res.send("<h1>Hello - Testing app.js</h1>");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {

  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;

  let data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  let jsonData = JSON.stringify(data);

  let options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/5cb5a15fe5",
    method: "POST",
    headers: {
      "Authorization": "rich1 784cd2095390361ff8563411c3b5dd18-us4"
    },
    body: jsonData
  };

  request(options, function(error, response, body) {
    if(error) {
      res.sendFile(__dirname + "/failure.html")
    } else {
      if(response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html")
      } else {
        res.sendFile(__dirname + "/failure.html")
      }
    }
  });

});

app.post("/failure", function(req, res) {
  res.redirect("/");
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server Started on Port 3000");
});


// 784cd2095390361ff8563411c3b5dd18-us4

// 5cb5a15fe5
