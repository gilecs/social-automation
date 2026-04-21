import "dotenv/config";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  notionVersion: "2025-09-03",
});

export async function markPostAsPosted(pageId: string): Promise<void> {
  await notion.pages.update({
    page_id: pageId,
    properties: {
      Status: {
        select: {
          name: "Posted",
        },
      },
    },
  });
}