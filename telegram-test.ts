import "dotenv/config";
import { getScheduledPosts } from "./src/content/notion";
import { markPostAsPosted } from "./src/content/notion-update";
import { publishToTelegram } from "./src/platforms/telegram";

async function main() {
  const posts = await getScheduledPosts();

  if (posts.length === 0) {
    console.log("No scheduled posts found.");
    return;
  }

  console.log(`Found ${posts.length} scheduled post(s).`);

  for (const post of posts) {
    console.log("Sending post to Telegram:");
    console.log(JSON.stringify(post, null, 2));

    await publishToTelegram(post);
    await markPostAsPosted(post.id);

    console.log(`Posted and marked as Posted: ${post.id}`);
  }

  console.log("All scheduled Telegram posts processed successfully.");
}

main().catch((error) => {
  console.error("Telegram batch test failed:", error);
  process.exit(1);
});