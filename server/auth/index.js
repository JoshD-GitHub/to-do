const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');

const checkUniqueUsername = async (username) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  return !existingUser;
};

const verifyCredentials = async (username, password) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (!user) {
    return false;
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  return passwordMatch;
}

router.get('/', (req, res) => {
  res.send('You have reached the auth router');
});

router.post('/register', async (req, res) => {
  try {
    const user = req.body;
    const isUnique = await checkUniqueUsername(user.username);
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
  try {
    const { username, password } = req.body;
    const verify = await verifyCredentials(username, password);
    if (!verify) {
      return res.status(401).json({ error: 'Incorrect username or password' });
    }
    const user = await prisma.user.findUnique({
      where: { username },
    });
    const token = jwt.sign({ id: user.id }, process.env.JWT);
    res.status(201).send({ token });
  } catch (error) {
    res.send(400).json({ error: 'The server could not understand the request.'});
  }
});

module.exports = router;