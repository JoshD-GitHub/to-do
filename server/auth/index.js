const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('You have reached the auth router');
});

module.exports = router;