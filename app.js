const express = require('express');
const app = express();
let users = [
  {
    id: 1,
    name: 'alice',

  },
  {
    id:2,
    name:'bob',
  },
  {
    id:3,
    name:'charlie',
  }
]

app.get('/', (req,res) => {
  res.send('hello world!\n');
});

app.get('/users', (req, res) => {
  return res.json(users);
});

app.get('/users/:id', (req,res) => {
  const id = parseInt(req.params.id, 10);
  if ( !id ){
    return res.status(400).json({error : 'Incorrect Id'});
  }
  let user = users.filter(user => user.id === id )[0]
  if ( !user ) {
    return res.status(404).json({erro: 'Unknow user'});
  }

  return res.json(user);
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(400).json({error: 'Incorrect id'});
  }

  const userIdx = users.findIndex(user => user.id === id);
  if (userIdx === -1) {
    return res.status(404).json({error: 'Unknown user'});
  }

  users.splice(userIdx, 1);
  res.status(204).send();
});


app.listen(3000, ()=>{
  console.log('[RUN] api server port 3000');
});


