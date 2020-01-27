var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;
var knex = require('./db/knex');

var app =express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/todos', (req,res) => {
  knex.select().from('todos')
    .then((todos) =>{
      res.send(todos);
    }).catch((error) => {
      console.log(error);
    })
});

app.get('/todos/:id', (req,res) => {
  knex.select()
    .from('todos')
    .where('id', req.params.id)
    .then((todos) =>{
      res.send(todos);
    }).catch((error) => {
      console.log(error);
    })
});

app.post('/todos', (req, res) => {
  knex('todos').insert({
    title: req.body.title,
    user_id: req.body.user_id
  })
  .then(() => {
    knex.select().from('todos')
      .then((todos) => {
            res.send(todos);
      });
  }).catch((error)=>{
    console.log(error)
  });
});

app.put('/todos/:id', (req, res) => {
  knex('todos').where('id', req.params.id)
    .update({
      title: req.body.title,
      completed:req.body.completed
    })
    .then(() => {
      knex.select().from('todos')
      .then((todos) => {
            res.send(todos);
      });
    });
});


app.delete('/todos/:id', (req,res) => {
  knex('todos')
    .where('id', req.params.id)
    .delete()
    .then(() => {
      knex.select().from('todos')
        .then((todos) => {
              res.send(todos);
      });
    });
});

//JOINS

// app.get('/todos-of-user/:id', (req, res) => {
//   knex.raw('select * from todos inner join users on todos.user_id = users.id where todos.user_id = ?', [req.params.id])
//       .then((todos) => {
//           res.send(todos)
//       }).catch((error) => {
//         console.error(error)
//       });
// });

app.get('/todos-of-user/:id', (req, res) => {
  knex.from('todos')
  .innerJoin('users', 'todos.user_id', 'users.id')
  .where('todos.user_id', req.params.id)
      .then((data) => {
          res.send(data)
      }).catch((error) => {
        console.error(error)
      });
});

app.listen(port, function() {
  console.log("listening on port:", port)
});