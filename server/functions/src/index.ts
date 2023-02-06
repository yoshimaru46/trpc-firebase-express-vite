import * as functions from "firebase-functions";
import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { z } from "zod";

import * as express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";

// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;

type User = {
  id: string;
  name: string;
};

const t = initTRPC.context<Context>().create();
export const appRouter = t.router({
  getUser: t.procedure.input(z.string()).query((req) => {
    req.input; // string
    return { id: req.input, name: "Bilbo" } as User;
  }),
  createUser: t.procedure
    .input(z.object({ name: z.string().min(5) }))
    .mutation(async (req) => {
      // use your ORM of choice
      //   return await User.create({
      //     data: req.input,
      //   });

      // 本来はfiresotreに保存する
      return { id: "1", name: req.input.name } as User;
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;

const app: express.Application = express();
const api = functions
  .region("asia-northeast1")
  .runWith({
    secrets: [],
  })
  .https.onRequest(app);

// https://trpc.io/docs/express
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

export { api };
