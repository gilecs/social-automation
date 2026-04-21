export type PlatformName = "telegram" | "facebook" | "linkedin";

export type MediaType = "image" | "video";

export interface PostMedia {
  type: MediaType;
  url: string;
}

export interface Post {
  id: string;
  text: string;
  scheduledAt: string;
  platforms: PlatformName[];
  media?: PostMedia;
}
