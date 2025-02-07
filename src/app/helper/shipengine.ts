import ShipEngine from "shipengine";

if (!process.env.SHIPENGINE_API_KEY) {
  throw new Error("SHIPENGINE_API_KEY is not defined");
}

const shipEngine = new ShipEngine({
  apiKey: process.env.SHIPENGINE_API_KEY,
});

export { shipEngine };