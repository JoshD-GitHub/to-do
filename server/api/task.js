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

router.post('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;
    const {taskTitle, taskDescription} = req.body;
    const task = await prisma.task.create({
      data: {
        userId,
        taskTitle,
        taskDescription,
      },
    });
    if (!task) {
      res.status(500).json({ error: 'Error creating task' });
    } else {
      res.status(201).json(task);
    }
  } catch (error) {
    res.status(500).json({ error });
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
      res.status(404).send({ error: true, message: 'Task not found' });
    } else {
      res.status(200).send(task);
    }
  } catch (error) {
    console.error('Prisma error:', error);
    res.status(500).send({ error: true, message: 'Internal server error' });
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