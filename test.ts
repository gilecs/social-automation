import "dotenv/config";
import { getScheduledPosts } from "./src/content/notion";

async function main() {
  const posts = await getScheduledPosts();
  console.log(JSON.stringify(posts, null, 2));
}

main().catch((error) => {
  console.error("Failed to load scheduled posts:", error);
  process.exit(1);
});
