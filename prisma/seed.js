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
      userId: 1,
      taskTitle: 'Captain\'s Log, Stardate 1512.2.',
      taskDescription: 'On our third day of star mapping, an unexplained cubical object blocked our vessel\'s path. On the bridge, Mr. Spock immediately ordered general alert. My location – sickbay. Quarterly physical check.',
    },
  });

  await prisma.task.create({
    data: {
      userId: 1,
      taskTitle: 'Captain\'s Log, Stardate 1672.1.',
      taskDescription: 'Specimen-gathering mission on planet Alfa 177. Unknown to any of us during this time, a duplicate of me, some strange alter ego, had been created by the transporter malfunction.',
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