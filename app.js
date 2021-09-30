const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { Console } = require("console");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var predname = req.body.name;

  https.get("https://api.genderize.io/?name=" + predname, function (response) {
    response.on("data", function (data) {
      const names = JSON.parse(data);
      console.log(names);
      const predname = names.name;
      const predgender = names.gender;
      const predprobability = names.probability * 100;
      const girl =
        "https://i.pinimg.com/564x/1c/82/2e/1c822e83fcbc86dcb5b4710f0c4e4604.jpg";
      const boy =
        "https://lh3.googleusercontent.com/SZhHGD8vEXlMB7ff59fcUUFqTYQfvXbMHP7414sHOOXRbtaWGhzLygVqlc30DnmgIcY";
      const oops =
        "https://image.freepik.com/free-vector/oops-explosion-vector_53876-17099.jpg";
      if (predgender === null) {
        res.write("<center><h1>OOPS WE CAN'T FIND THAT NAME</h1></center>");
        res.write(
          "<center><img src= " + oops + " style= 'width: 100%'></center> \n"
        );
      } else if (predgender == "female") {
        res.write(
          "<center><h1>The name " +
            predname +
            " is a " +
            predgender +
            " with a probability of " +
            predprobability +
            "%.</h1></center>"
        );
        res.write(
          "<center><img src= " +
            girl +
            " style= 'width: 100%'; 'height: 50%' ></center> \n"
        );
      } else if (predgender == "male") {
        res.write(
          "<center><h1>The name " +
            predname +
            " is a " +
            predgender +
            " with a probability of " +
            predprobability +
            "%.</h1></center>"
        );
        res.write("<center><img src= " + boy + "></center> \n");
      }

      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log(" the server is running on port 3000");
});
