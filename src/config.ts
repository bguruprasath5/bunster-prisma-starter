import z from 'zod';

const configSchema = z.object({
  HOST_NAME: z.string().ip({ version: 'v4' }),
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  DATABASE_URL: z.string().trim().min(1),
  JWT_SECRET: z.string().trim().min(16),
});

export default configSchema.parse(process.env);
