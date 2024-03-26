import PgBoss from 'pg-boss';

const boss = new PgBoss(
  'postgresql://postgres:root@localhost:5432/mydb?schema=public'
);
await boss.start();

const queue = 'send-email';

let jobId = await boss.send(queue, { email: 'example@example.com' });
console.log('jobId', jobId);

let workId = await boss.work(queue, async (job) => {
  // Logic to send an email
  console.log(
    `Sending email to ${job.data.email} by job id: ${job.id} queue-name: ${job.name}`
  );
});
console.log('workId', workId);

await boss.send(queue, { email: 'example1@example.com' });
await boss.send(queue, { email: 'example2@example.com' });
await boss.send(queue, { email: 'example3@example.com' });
await boss.send(queue, { email: 'example4@example.com' });
await boss.send(queue, { email: 'example5@example.com' });
