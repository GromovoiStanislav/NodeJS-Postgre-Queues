const PgBoss = require('pg-boss');

async function readme() {
  const boss = new PgBoss(
    'postgresql://postgres:root@localhost:5432/mydb?schema=public'
  );

  boss.on('error', (error) => console.error(error));

  await boss.start();

  const queue = 'some-queue';

  let jobId = await boss.send(queue, { param1: 'foo1' });
  console.log(`created job in queue ${queue}: ${jobId}`);

  jobId = await boss.send(queue, { param1: 'foo2' });
  console.log(`created job in queue ${queue}: ${jobId}`);

  jobId = await boss.send(queue, { param1: 'foo3' });
  console.log(`created job in queue ${queue}: ${jobId}`);

  await boss.work(queue, someAsyncJobHandler);
}

async function someAsyncJobHandler(job) {
  console.log(`job ${job.id} received with data:`);
  console.log(JSON.stringify(job.data));

  await doSomethingAsyncWithThis(job.data);
}

readme();
