/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import type { TrackingData } from "@/lib/helper/type";
import { Loader2, Package, Truck, Calendar, CheckCircle } from "lucide-react";
import Feature from "../../components/Feature"
import Image from "../../app/tracking/Image"

function TrackShipment() {
  const [labelId, setLabelId] = useState("");
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const queryLabelId = searchParams?.get("labelId") || "";

  useEffect(() => {
    if (queryLabelId) {
      setLabelId(queryLabelId);
      handleSubmit(queryLabelId);
    }
  }, [queryLabelId]);

  const handleSubmit = async (labelId: string) => {
    if (!labelId) {
      setError("Label ID is required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      router.replace(`/tracking?labelId=${labelId}`);
      const response = await axios.get(`/api/shipengine/tracking/${labelId}`);
      setTrackingData(response.data);
    } catch (err) {
      console.error("Error tracking shipment:", err);
      setError(
        "Failed to track shipment. Please check the label ID and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Image />
      <div className="min-h-screen py-12 text-black">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">
            Track Your Shipment
          </h1>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(labelId);
              }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <label htmlFor="labelId" className="text-lg font-medium block">
                  Enter Label ID or Tracking Number
                </label>
                <div className="relative">
                  <Package className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="labelId"
                    value={labelId}
                    onChange={(e) => setLabelId(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="Enter your tracking number"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-yellow-600 text-white py-4 rounded-lg hover:bg-yellow-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Tracking...
                    </>
                  ) : (
                    <>
                      <Truck className="w-5 h-5" />
                      Track Shipment
                    </>
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div className="mt-6 p-6 bg-red-50 rounded-xl border-l-4 border-red-500">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {trackingData && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-8">Tracking Details</h2>
                <div className="grid gap-6">
                  <div className="p-6 ">
                    <div className="flex items-start gap-4">
                      <Package className="w-6 h-6 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Tracking Number</p>
                        <p className="text-lg font-medium">
                          {trackingData.trackingNumber}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 ">
                    <div className="flex items-start gap-4">
                      <Truck className="w-6 h-6 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <p className="text-lg font-medium">
                          {trackingData.statusDescription}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Carrier Status:{" "}
                          {trackingData.carrierStatusDescription || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 ">
                    <div className="flex items-start gap-4">
                      <Calendar className="w-6 h-6 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">
                          Estimated Delivery
                        </p>
                        <p className="text-lg font-medium">
                          {trackingData.estimatedDeliveryDate || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 ">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="w-6 h-6 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Actual Delivery</p>
                        <p className="text-lg font-medium">
                          {trackingData.actualDeliveryDate || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default function TrackingPage() {
  return (
    <>
      <Suspense
        fallback={
          <div className="min-h-scree flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-black" />
          </div>
        }
      >
        <TrackShipment />
      </Suspense>
      <Feature />
    </>
  );
}
