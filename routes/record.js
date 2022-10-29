const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /todos.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

recordRoutes.route("/todos").get((req, res) => {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("todoTasks")
    .find({})
    .then(() => {
      console.log("done");
      res.json(res);
    })
    .catch(() => {
      res.status(400).send("Error fetching todos!");
    });
});

// recordRoutes.post("/todos/create", (req, res) => {
//   const { todo } = req.body;
//   const dbConnect = dbo.getDb();
//   dbConnect
//     .collection("todoTasks")
//     .insertOne(todo)
//     .then(() => {
//       console.log("done");
//       res.redirect("/");
//     })
//     .catch((err) => console.log(err));
// });

// recordRoutes.route("/todos/:id").get(async function (req, res) {
//   const dbConnect = dbo.getDb();
//   const { id } = req.params;
//   dbConnect
//     .collection("todoTasks")
//     .deleteOne({ id })
//     .toArray(function (err, result) {
//       if (err) {
//         res.status(400).send("Error fetching todos!");
//       } else {
//         res.json(result);
//       }
//     });
// });

module.exports = recordRoutes;
