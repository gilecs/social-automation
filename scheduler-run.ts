import "dotenv/config";
import { runScheduler } from "./src/core/scheduler";

async function main() {
  await runScheduler();
}

main().catch((error) => {
  console.error("Scheduler run failed:", error);
  process.exit(1);
});