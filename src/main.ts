import { Bunster } from "bunsterjs";
import userRoute from "./routes/user.route";
import authRoute from "./routes/auth.route";
import config from "./config";

new Bunster()
  .get({
    path: "/",
    handler: (ctx) =>
      ctx.sendJson({ message: "Hi 👋 from bunster server 🔥!" }),
  })
  .mount({ path: "/", routeGroup: authRoute })
  .mount({ path: "/", routeGroup: userRoute })
  .serve({
    hostname: config.HOST_NAME,
    port: config.PORT,
    cors: true,
  });
