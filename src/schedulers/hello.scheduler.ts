import { BunsterTaskContext } from 'bunsterjs';

export async function helloScheduler(ctx: BunsterTaskContext): Promise<void> {
  ctx.log('info', 'Hi 👋 from scheduler');
}
