// utils/trpc.ts
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../server/functions/src/index";
export const trpc = createTRPCReact<AppRouter>();
