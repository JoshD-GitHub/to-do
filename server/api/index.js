const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('You have reached the api router');
});

router.use('/tasks', require('./tasks'));
router.use('/users', require('./users'));

module.exports = router;