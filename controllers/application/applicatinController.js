exports.home = (req, res) => {
  res.status(200).render('application');
};

exports.login = (req, res) => {
  res.status(200).render('login', {
    title: 'login'
  });
};
