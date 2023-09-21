import { Bunster, CronExpression } from 'bunsterjs';
import userRoute from './routes/user.route';
import authRoute from './routes/auth.route';
import config from './config';
import { helloScheduler } from './schedulers/hello.scheduler';

new Bunster()
  .get({
    path: '/',
    handler: (ctx) =>
      ctx.sendJson({ message: 'Hi 👋 from bunster server 🔥!' }),
  })
  .mount({ path: '/', routeGroup: authRoute })
  .mount({ path: '/', routeGroup: userRoute })
  .schedule({
    id: 'hello',
    cronExpression: CronExpression.EVERY_10_SECONDS,
    task: helloScheduler,
  })
  .serve({
    hostname: config.HOST_NAME,
    port: config.PORT,
    cors: true,
    loggerConfig: {
      logRequest: true,
    },
  });
