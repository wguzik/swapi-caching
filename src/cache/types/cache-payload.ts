export type CachePayload = {
  page?: number;
  id?: number;
  slug: string;
  content: Record<PropertyKey, any>;
};

export type CacheQuery = Omit<CachePayload, "content" | "slug">;
