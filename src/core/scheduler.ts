import "dotenv/config";
import { Post } from "./types";
import { getScheduledPosts } from "../content/notion";
import { markPostAsPosted } from "../content/notion-update";
import { publishToTelegram } from "../platforms/telegram";

function isDue(scheduledAt: string): boolean {
  if (!scheduledAt) return false;

  const scheduledTime = new Date(scheduledAt).getTime();
  const now = Date.now();

  return scheduledTime <= now;
}

async function processPost(post: Post) {
  if (!post.platforms.includes("telegram")) {
    return;
  }

  if (!isDue(post.scheduledAt)) {
    console.log(`Skipping not-yet-due post: ${post.id}`);
    return;
  }

  await publishToTelegram(post);
  await markPostAsPosted(post.id);

  console.log(`Posted to Telegram and marked as Posted: ${post.id}`);
}

export async function runScheduler(): Promise<void> {
  const posts = await getScheduledPosts();

  if (posts.length === 0) {
    console.log("No scheduled posts found.");
    return;
  }

  console.log(`Found ${posts.length} scheduled post(s).`);

  for (const post of posts) {
    await processPost(post);
  }

  console.log("Scheduler run completed.");
}