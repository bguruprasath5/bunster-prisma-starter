import { BunsterJwt, BunsterRouteGroup } from 'bunsterjs';
import userRepository from '../repositories/user.repository';
import { loginSchema } from '../models/login.model';

const router = new BunsterRouteGroup({ basePath: '/auth' });

router.post({
  path: '/login',
  input: {
    body: loginSchema,
  },
  handler: async (ctx) => {
    let user = await userRepository.getUserByEmail(ctx.body.email);

    if (user && (await Bun.password.verify(ctx.body.password, user.password))) {
      const token = await BunsterJwt.sign(
        { id: user.id, email: user.email },
        '1 day'
      );
      user = await userRepository.updateUser(user.id, { token });
      return ctx.sendJson({
        message: 'Login successful',
        data: { ...user, password: undefined },
      });
    }
    return ctx.sendJson({ message: 'Invalid credentials' }, { status: 400 });
  },
});

export default router;
