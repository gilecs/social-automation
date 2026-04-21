import { runScheduler } from "../../src/core/scheduler";

export const handler = async () => {
  try {
    await runScheduler();

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, message: "Scheduler ran successfully" }),
    };
  } catch (error) {
    console.error("Netlify scheduler failed:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, message: "Scheduler failed" }),
    };
  }
};