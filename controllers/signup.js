const handleSignup = (req, res, db, bcrypt) => {
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
}

module.exports = {
  handleSignup: handleSignup
};