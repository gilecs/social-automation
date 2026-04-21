import type { Config } from "@netlify/functions";
import { runScheduler } from "../../src/core/scheduler";

export default async (_req: Request) => {
  await runScheduler();

  return new Response(
    JSON.stringify({ ok: true, message: "Scheduler ran successfully" }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    }
  );
};

export const config: Config = {
  schedule: "*/5 * * * *",
};