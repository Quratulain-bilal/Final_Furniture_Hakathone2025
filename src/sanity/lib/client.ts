import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID, // Private key
  dataset: process.env.SANITY_DATASET, // Private key
  apiVersion: process.env.SANITY_API_VERSION, // Private key
  useCdn:false,
  token: process.env.SANITY_TOKEN, // Private key
});
