import "dotenv/config";
import { Client } from "@notionhq/client";
import { Post, PlatformName } from "../core/types";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  notionVersion: process.env.NOTION_VERSION,
});

function isPlatformName(value: string): value is PlatformName {
  return value === "telegram" || value === "facebook" || value === "linkedin";
}

export async function getScheduledPosts(): Promise<Post[]> {
  const databaseId = process.env.NOTION_DB_ID;

  if (!databaseId) {
    throw new Error("Missing NOTION_DB_ID in .env");
  }

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Status",
      select: {
        equals: "Scheduled",
      },
    },
  });

  return response.results.map((page: any) => {
    const textProperty = page.properties?.Text;
    const scheduledAtProperty = page.properties?.["Scheduled At"];
    const platformsProperty = page.properties?.Platforms;
    const mediaUrlProperty = page.properties?.["Media URL"];

    const text =
      textProperty?.type === "rich_text"
        ? textProperty.rich_text.map((item: any) => item.plain_text).join("")
        : "";

    const scheduledAt =
      scheduledAtProperty?.type === "date"
        ? scheduledAtProperty.date?.start ?? ""
        : "";

    const platformsRaw =
      platformsProperty?.type === "multi_select"
        ? platformsProperty.multi_select.map((p: any) =>
            String(p.name).toLowerCase()
          )
        : [];

    const platforms = platformsRaw.filter(isPlatformName);

    const mediaUrl =
      mediaUrlProperty?.type === "url" ? mediaUrlProperty.url ?? "" : "";

    const media = mediaUrl
      ? {
          type: /\.(mp4|mov|webm)$/i.test(mediaUrl) ? "video" as const : "image" as const,
          url: mediaUrl,
        }
      : undefined;

    return {
      id: page.id,
      text,
      scheduledAt,
      platforms,
      media,
    };
  });
}
