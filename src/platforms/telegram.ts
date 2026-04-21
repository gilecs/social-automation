import "dotenv/config";
import { Post } from "../core/types";

export async function publishToTelegram(post: Post): Promise<void> {
  const token = process.env.TG_TOKEN;
  const chatId = process.env.TG_CHAT;

  if (!token) {
    throw new Error("Missing TG_TOKEN in .env");
  }

  if (!chatId) {
    throw new Error("Missing TG_CHAT in .env");
  }

  if (post.media?.url) {
    if (post.media.type === "image") {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          photo: post.media.url,
          caption: post.text,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(`Telegram sendPhoto failed: ${JSON.stringify(data)}`);
      }

      return;
    }

    if (post.media.type === "video") {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendVideo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          video: post.media.url,
          caption: post.text,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(`Telegram sendVideo failed: ${JSON.stringify(data)}`);
      }

      return;
    }
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: post.text,
    }),
  });

  const data = await res.json();

  if (!res.ok || !data.ok) {
    throw new Error(`Telegram sendMessage failed: ${JSON.stringify(data)}`);
  }
}