const handleSignin = (req, res, db, bcrypt) => {
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
}


module.exports = {
  handleSignin: handleSignin
};