const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

let db = [
  {
    actor_id: 1,
    first_name: "PENELOPE",
    last_name: "GUINESS",
    last_update: "2006-02-15T00:34:33.000Z",
  },
  {
    actor_id: 2,
    first_name: "NICK",
    last_name: "WAHLBERG",
    last_update: "2006-02-15T00:34:33.000Z",
  },
  {
    actor_id: 3,
    first_name: "ED",
    last_name: "CHASE",
    last_update: "2006-02-15T00:34:33.000Z",
  },
];
let connection = mysql.createConnection({
  host: "b1pbtsiw0jlyozs86myr-mysql.services.clever-cloud.com",
  user: "ugkdgoxx9rlzpauc",
  password: "iZXOCGGrrRWtpZ0Ux3hY",
  database: "b1pbtsiw0jlyozs86myr",
});
// app.get("/student", function (req, res) {
//   res.send(db);
// });

// // api get method

app.get("/", function (req, res) {
  connection.query("select * from onlar", function (err, result, fields) {
    //   console.log(err);
    //   console.log(result);
    //   console.log(fields);
    res.send(result);
  });
});

// app.get("/student", (req, res) => {
//   res.send(db);
// });

// id get
app.get("/onlar/:id", (req, res) => {
  const elem = req.params;
  // sql id get method
  connection.query("select * from onlar", function (err, result, fields) {
    // console.log(result);
    for (let i = 0; i < result.length; i++) {
      if (elem.id == result[i].ID) {
        res.send(result[i]);
      }
    }
  });
});
// delete method
app.delete("/onlar/:id", (req, res) => {
  const elem = req.params.id;
  const silininenElementArray = db.filter(
    (element) => element.actor_id != elem
  );
  connection.query(
    `DELETE FROM onlar WHERE ID=${elem}`,
    function (err, result, fields) {
      console.log(result);
    }
  );
});

// post method
app.post("/onlar/", (req, res) => {
  let obj = req.body;
  connection.query(
    `INSERT INTO onlar (ID, ad, soyad)
    VALUES ("${obj.ID}", "${obj.ad}", "${obj.soyad}")`,
    function (err, result, fields) {
      //   console.log(result);
      //   app.get("/student", function (req, res) {
      //     res.send(result);
      //   });
    }
  );
  connection.query("select * from onlar", function (err, result, fields) {
    //   console.log(err);
    console.log(result);
    res.send(result);
  });
});

app.listen(process.env.PORT || 3000);