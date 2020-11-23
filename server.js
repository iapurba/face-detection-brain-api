const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'apu',
    password : 'apurba30',
    database : 'smart-brain'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send(database.users);
})

app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  db.select('email', 'password').from('login')
  .where('email', '=', email)
  .then(data => {
    const isValid = bcrypt.compareSync(password, data[0].password);
    if(isValid) {
      db.select('*').from('users')
      .where('email', '=', email)
      .then(user => {
        res.json(user[0])
      })
      .catch(err => res.status(400).json('unable to get user'));
    } else {
      res.status(400).json('wrong credentials');
    }
  })
  .catch(err => res.status(400).json('wrong credentials'));
})

app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx.insert({
      password: hash,
      email: email
    })
    .into('login')
    .returning('email')
    .then(() => {
      return trx('users')
        .returning('*')
        .insert({
          name: name,
          email: email,
          joined: new Date()
      })
      .then(user => {
        res.json(user[0]);
      })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json('unable to sign up'));  
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('*').from('users').where({
    id: id
  })
  .then(user => {
    if (user.length) {
      res.json(user[0])
    } else {
      res.status(400).json('not found');
    }
    
  })
  .catch(err => res.status(400).json('error getting user'));
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  db('users')
  .where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0])
  })
  .catch(err => res.status(400).json('unable to get entries'))
})


app.listen(3000, () => {
  console.log('app is running on port 3000');
})
