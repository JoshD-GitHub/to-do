const router = require('express').Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');

router.get('/', (req, res) => {
  res.send('You have reached the auth router');
});

router.post('/register', async (req, res) => {
  try {
    const user = req.body;
    user.password = await bcrypt.hash(user.password, 10);
    const result = await prisma.user.create({
      data: user,
    });
    if (result) {
      const token = jwt.sign({ id: result.id }, process.env.JWT);
			res.status(201).send({ token });
    } else {
      res.send({ error: 'Error creating user' });
    }
  } catch (error) {
    res.send(error);
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { username: username },
  });
	if (user) {
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (passwordMatch) {
			const token = jwt.sign({ id: user.id }, process.env.JWT);
			res.status(201).send({ token });
		} else {
			res.send({ message: 'Invalid Login' });
		}
	} else {
		res.send({ message: 'Invalid Login' });
	}
});

module.exports = router;