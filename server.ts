import { app } from './src/app';
import { mongodbInstance } from './src/db/init.mongodb';

const server = app.listen(process.env.NODE_PORT, async () => {
  await mongodbInstance.connect();
  console.log(
    process.env.NODE_ENV,
    'hello world from port',
    process.env.NODE_PORT
  );
});

process.on('SIGINT', () => cleanup('SIGINT'));
process.on('SIGTERM', () => cleanup('SIGTERM'));
process.on('uncaughtException', (e) => {
  console.error('UncaughtException: ', e);
});

async function cleanup(sig: string) {
  console.log(`Received kill signal: ${sig}, shutting down gracefully`);
  await mongodbInstance.disconnect();
  await server.close(() => {
    console.log('Closed out remaining connections');
  });
  process.exit(0);
}
