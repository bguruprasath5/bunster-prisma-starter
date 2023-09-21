import { BunsterContext, BunsterJwt, HttpError, HttpStatus } from "bunsterjs";
import userRepository from "../repositories/user.repository";
import { JwtPayload } from "../models/auth.model";

export async function authMiddleware(ctx: BunsterContext): Promise<void> {
  try {
    const token = ctx.headers
      ? ctx.headers.get("Authorization")?.split("Bearer ")[1]
      : null;

    if (!token) {
      throw new HttpError("Invalid token", HttpStatus.UNAUTHORIZED);
    }

    const jwtPayload = await BunsterJwt.verify<JwtPayload>(token);

    const user = await userRepository.getUserById(jwtPayload.id);

    if (!user?.token || user?.token !== token) {
      throw new HttpError("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
    //user authentication success so returning
    return;
  } catch (error) {
    throw new HttpError("Unauthorized", HttpStatus.UNAUTHORIZED);
  }
}
