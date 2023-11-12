const router = require('express').Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');

const checkUsername = async (username) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  return !existingUser;
};

router.get('/', (req, res) => {
  res.send('You have reached the auth router');
});

router.post('/register', async (req, res) => {
  try {
    const user = req.body;
    const isUnique = await checkUsername(user.username);
    if (!isUnique) {
      return res.status(409).json({ error: 'Username is not unique. Please choose another.' });
    }
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
    where: { username },
  });
  if (!user) {
    return res.status(409).json({ error: 'User does not exist.' });
  }
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