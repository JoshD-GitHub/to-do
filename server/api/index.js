const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('You have reached the api router');
});

router.use('/task', require('./task'));
router.use('/user', require('./user'));

module.exports = router;