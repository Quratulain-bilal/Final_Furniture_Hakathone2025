export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ||'v1';

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)


export const token = assertValue(
"skE73N4rPffGYDCt8RjkbOOlMOJtSE91f7x0w9JJH5N98M2oGxEEkO4kgie32ks4lys4YqI95voNcskMJ6NL122zQZ7P6Zzk3T0ROzYMguiK4hzKqDunX4A92Ap82UMm0P2lVczgE0BXMkKYsGE2NaeHgsbAG8HOBy2rshcIQuAp3ZsPYHGq",

  "Missing environment variable: SANITY_API_TOKEN"
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
