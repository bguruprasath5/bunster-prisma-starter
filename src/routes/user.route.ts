import { BunsterRouteGroup, HttpError, HttpStatus } from "bunsterjs";
import userRepository from "../repositories/user.repository";
import { z } from "zod";
import { authMiddleware } from "../middlewares/auth.middlware";
import { createUserSchema, updateUserSchema } from "../models/user.model";

const router = new BunsterRouteGroup({
  basePath: "/user",
  middlewares: [authMiddleware],
});

router.get({
  path: "/",
  handler: async (ctx) => {
    const users = await userRepository.getAllUsers();
    return ctx.sendJson({ message: "Users fetched successfully", users });
  },
});

router.get({
  path: "/:id",
  input: {
    params: z.object({
      id: z.coerce.number(),
    }),
  },
  handler: async (ctx) => {
    const user = await userRepository.getUserById(ctx.params.id);
    if (user) {
      return ctx.sendJson({ message: "User fetched successfully", user });
    } else {
      throw new HttpError("User not found", HttpStatus.NOT_FOUND);
    }
  },
});

router.post({
  path: "/",
  input: {
    body: createUserSchema,
  },
  handler: async (ctx) => {
    ctx.body.password = await Bun.password.hash(ctx.body.password);
    const newUser = await userRepository.createUser(ctx.body);
    return ctx.sendJson({
      message: "User created successfully",
      data: newUser,
    });
  },
});

router.put({
  path: "/:id",
  input: {
    params: z.object({
      id: z.coerce.number(),
    }),
    body: updateUserSchema,
  },
  handler: async (ctx) => {
    const updatedUser = await userRepository.updateUser(
      ctx.params.id,
      ctx.body
    );
    if (updatedUser) {
      return ctx.sendJson({
        message: "User updated successfully",
        updatedUser,
      });
    } else {
      throw new HttpError("User not found", HttpStatus.NOT_FOUND);
    }
  },
});

router.delete({
  path: "/:id",
  input: {
    params: z.object({
      id: z.coerce.number(),
    }),
  },
  handler: async (ctx) => {
    const deleted = await userRepository.softDeleteUser(ctx.params.id);
    if (deleted) {
      return ctx.sendJson({ message: "User deleted successfully" });
    } else {
      throw new HttpError("User not found", HttpStatus.NOT_FOUND);
    }
  },
});

export default router;
