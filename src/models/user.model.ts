import { z } from 'zod';

const userSchema = z.object({
  id: z.number(),
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export const createUserSchema = userSchema.omit({ id: true });
export type CreateUserDto = z.infer<typeof createUserSchema>;

export const updateUserSchema = createUserSchema.partial();
export type UpdateUserDto = z.infer<typeof updateUserSchema>;

const userSchemaWithoutPassword = userSchema.omit({ password: true });
export type User = z.infer<typeof userSchemaWithoutPassword>;
