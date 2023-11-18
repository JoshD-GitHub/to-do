const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = require('express').Router();
const authenticateToken = require('./utils');

router.get('/', authenticateToken, async(req, res) => {
  try {
    const userId = req.userId;
    const task = await prisma.task.findMany({
      where: {
        userId: userId,
      },
    });
    if (!task) {
      res.send({ error: true, message: 'Task not found' });
    } else {
      res.send(task);
    }
  } catch (error) {
    res.send({ error: true, message: 'Error finding task' });
  }
});

router.get('/:id', async(req, res) => {
  try {
    const task = await prisma.task.findMany({
      where: {
        userId: userId,
      },
    });
    if (!task) {
      res.send({ error: true, message: 'Task not found' });
    } else {
      res.send(task);
    }
  } catch (error) {
    res.send({ error: true, message: 'Error finding task' });
  }
});

router.post('/', async (req, res) => {
  try {
    const task = await prisma.task.create({
      data: req.body,
    });
    if (!task) {
      res.send({ error: 'Error creating task' });
    } else {
      res.send(task);
    }
  } catch (error) {
    res.send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const task = await prisma.task.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    if (!task) {
      res.send({ error: true, message: 'Error creating task' });
    } else {
      res.send(task);
    }
  } catch (error) {
    res.send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const task = await prisma.task.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!task) {
      res.send({ error: true, message: 'Task not found' });
    } else {
      res.send(task);
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;