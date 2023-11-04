const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

const main = async () => {
  const user1 = {
    username: 'captainK',
    password: await bcrypt.hash('3nterprise', 10),
  };

  const user2 = {
    username: 'captainP',
    password: await bcrypt.hash('enterpris3', 10),
  };

  await prisma.user.create({
    data: user1,
  });

  await prisma.user.create({
    data: user2,
  });

  await prisma.task.create({
    data: {
      userId: 1,
      taskTitle: 'Explore new worlds, new civilizations',
      taskDescription: 'Boldly go where no man has gone before.',
    },
  });

  await prisma.task.create({
    data: {
      userId: 2,
      taskTitle: 'Tea. Earl Grey. Hot.',
      taskDescription: '',
    },
  });
};

main();