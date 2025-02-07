import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "2nm9s41t",
  dataset: "production",
  apiVersion: "v1",
  useCdn: false,
  token:"skE73N4rPffGYDCt8RjkbOOlMOJtSE91f7x0w9JJH5N98M2oGxEEkO4kgie32ks4lys4YqI95voNcskMJ6NL122zQZ7P6Zzk3T0ROzYMguiK4hzKqDunX4A92Ap82UMm0P2lVczgE0BXMkKYsGE2NaeHgsbAG8HOBy2rshcIQuAp3ZsPYHGq",
});
