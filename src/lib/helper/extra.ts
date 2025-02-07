import { Address, Package } from "@/lib/helper/type";
import { NextRequest } from "next/server";
import ShipEngine from "shipengine";

export async function POST(req: NextRequest) {
  const {
    shipeToAddress,
    parcels,
  }: { shipeToAddress: Address; parcels: Package[] } = await req.json();
  const shipengine = new ShipEngine({
    apiKey: "TEST_SRXaZXhKSKWqPXoQu2h090Fmto27waX7Q4/bd06bWZE",
  });

  try {
    // if (!shipeToAddress || !packages) {
    //   return new Response(
    //     JSON.stringify({ error: "Missing required fields" }),
    //     { status: 400 }
    //   );
    // }
    const shipmentDetails = await shipengine.getRatesWithShipmentDetails({
      shipment: {
        shipTo: shipeToAddress,
        shipFrom: {
          name: "Recipient Name", // Replace with the recipient's name
          phone: "+92 300 1234567", // Replace with the recipient's phone number
          addressLine1: "Defence Authority", // Shortened to fit within 35 characters
          addressLine2: "Baldiya town", // Additional details moved to Address Line 2
          cityLocality: "Karachi",
          stateProvince: "Sindh",
          postalCode: "75760",
          countryCode: "PK",
          addressResidentialIndicator: "yes",
        },
        packages: parcels,
      },
      rateOptions: {
        carrierIds: ["se-1813786", "se-1813787", "se-1813788", "se-1813835"],
        // serviceCodes: ["ups_ground"],
      },
    });
    console.log(shipeToAddress, parcels, shipmentDetails);
    return new Response(JSON.stringify({ shipeToAddress, parcels , shipmentDetails}), { status: 200 });
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}
