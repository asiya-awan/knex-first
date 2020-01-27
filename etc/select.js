app.get('/todos', (req,res) => {
  knex.raw('select * from todos').then((todos) =>{
    res.send(todos);
  }).catch((error) => {
    console.log(error);
  })
})
app.get('/todos', (req,res) => {
  knex.select().from('todos').where({id: 1}).then((todos) =>{
    res.send(todos);
  }).catch((error) => {
    console.log(error);
  })
});

app.get('/todos', (req,res) => {
  knex.select().from('todos').where('id', 1).then((todos) =>{
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

// POST 

// app.post('/todos', (req, res) => {
//   knex.raw('insert into todos(title, user_id) values (?, ?)', ['go play sports', 1])
//   .then(() => {
//     knex.select().from('todos')
//       .then((todos) => {
//             res.send(todos);
//       });
//   }).catch((error)=>{
//     console.log(error)
//   });
// });

app.post('/todos', (req, res) => {
  knex('todos').insert({
    title: "go play some shortcut sports...whatever that means",
    user_id: 3
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


// PUT 

app.put('/todos/:id',() => {
  knex.raw('update todos set ' + req.body.field + ' = ? WHRE id = ?', [req.body.value, req.params.id])
})


app.put('/todos/:id',() => {
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
    })
})

// DELETE 

app.delete('/todos/:id', (req,res) => {
  knex.raw('delete from todos where id = ? ', [req.params.id])
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

// JOINS

app.get('/todos-of-user/:id', (req, res) => {
  knex.raw('select * from todos inner join users on todos.user_id = users.id where todos.user_id = ?', [req.params.id])
      .then((todos) => {
          res.send(todos)
      }).catch((error) => {
        console.error(error)
      });
});

app.get('/todos-of-user/:id', (req, res) => {
  knex.from('todos')
  .innerJoin('users', 'todos.user_id', 'users.id')
  .where('todos.user_id', req.params.id)
      .then((todos) => {
          res.send(todos)
      }).catch((error) => {
        console.error(error)
      });
});