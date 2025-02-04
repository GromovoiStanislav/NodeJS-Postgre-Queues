import PgBoss from 'pg-boss';

const boss = new PgBoss(
  'postgresql://postgres:root@localhost:5432/mydb?schema=public'
);
await boss.start();

const queue = 'send-email';

await boss.send(queue, { email: 'example@example.com' });

// let job = await boss.fetch(queue);
// //Logic to send an email
// console.log(
//   `Sending email to ${job.data.email} by job id: ${job.id} queue-name: ${job.name}`
// );

await boss.send({ name: queue, data: { email: 'example@example.com' } });

// job = await boss.fetch(queue);
// //Logic to send an email
// console.log(
//   `Sending email to ${job.data.email} by job id: ${job.id} queue-name: ${job.name}`
// );

const batchSize = 10;
const jobs = await boss.fetch(queue, batchSize);
console.log(jobs);
