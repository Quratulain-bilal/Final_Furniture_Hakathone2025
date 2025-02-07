"use client";
import type React from "react";
import { useState } from "react";
import axios from "axios";
import type { Address, Rate, trackingObjType } from "@/lib/helper/type";
import { cartProductsWhichCanBeShipped } from "@/lib/helper/data";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import Image from "../shipping/Image";
import Feature from "../../components/Feature"

const ShippingRatesPage = () => {
  const [shipeToAddress, setshipeToAddress] = useState<Address>({
    name: "John Doe",
    phone: "+1 555-678-1234",
    addressLine1: "1600 Pennsylvania Avenue NW",
    addressLine2: "",
    cityLocality: "Washington",
    stateProvince: "DC",
    postalCode: "20500",
    countryCode: "US",
    addressResidentialIndicator: "no",
  });

  const [rates, setRates] = useState<Rate[]>([]);
  const [rateId, setrateId] = useState<string | null>(null);
  const [labelPdf, setLabelPdf] = useState<string | null>(null);
  const [trackingObj, setTrackingObj] = useState<trackingObjType | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setRates([]);

    try {
      const response = await axios.post("/api/shipengine/get-rates", {
        shipeToAddress,
        packages: cartProductsWhichCanBeShipped.map((product) => ({
          weight: product.weight,
          dimensions: product.dimensions,
        })),
      });
      setRates(response.data.shipmentDetails.rateResponse.rates);
    } catch (error) {
      console.log(error);
      setErrors(["An error occurred while fetching rates."]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLabel = async () => {
    if (!rateId) {
      alert("Please select a rate to create a label.");
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      const response = await axios.post("/api/shipengine/label", {
        rateId: rateId,
      });
      const labelData = response.data;
      setLabelPdf(labelData.labelDownload.href);
      setTrackingObj({
        trackingNumber: labelData.trackingNumber,
        labelId: labelData.labelId,
        carrierCode: labelData.carrierCode,
      });
    } catch (error) {
      console.log(error);
      setErrors(["An error occurred while creating the label."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Image />
      <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-black mb-8 text-center">
            Shipping Calculator
          </h1>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <h2 className="text-3xl font-medium text-black mb-6">
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={shipeToAddress.name}
                      onChange={(e) =>
                        setshipeToAddress({
                          ...shipeToAddress,
                          name: e.target.value,
                        })
                      }
                      className="w-full  h-20 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={shipeToAddress.phone}
                      onChange={(e) =>
                        setshipeToAddress({
                          ...shipeToAddress,
                          phone: e.target.value,
                        })
                      }
                      className="w-full h-20 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-gray-700">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      value={shipeToAddress.addressLine1}
                      onChange={(e) =>
                        setshipeToAddress({
                          ...shipeToAddress,
                          addressLine1: e.target.value,
                        })
                      }
                      className="w-full h-20  px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-gray-700">
                      Address Line 2 (Optional)
                    </label>
                    <input
                      type="text"
                      value={shipeToAddress.addressLine2}
                      onChange={(e) =>
                        setshipeToAddress({
                          ...shipeToAddress,
                          addressLine2: e.target.value,
                        })
                      }
                      className="w-full  h-20 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      value={shipeToAddress.cityLocality}
                      onChange={(e) =>
                        setshipeToAddress({
                          ...shipeToAddress,
                          cityLocality: e.target.value,
                        })
                      }
                      className="w-full h-20 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      State/Province
                    </label>
                    <input
                      type="text"
                      value={shipeToAddress.stateProvince}
                      onChange={(e) =>
                        setshipeToAddress({
                          ...shipeToAddress,
                          stateProvince: e.target.value,
                        })
                      }
                      className="w-full h-20 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={shipeToAddress.postalCode}
                      onChange={(e) =>
                        setshipeToAddress({
                          ...shipeToAddress,
                          postalCode: e.target.value,
                        })
                      }
                      className="w-full h-20 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Country Code
                    </label>
                    <input
                      type="text"
                      value={shipeToAddress.countryCode}
                      onChange={(e) =>
                        setshipeToAddress({
                          ...shipeToAddress,
                          countryCode: e.target.value,
                        })
                      }
                      className="w-full h-20 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-600 text-black py-4 rounded-lg hover:bg-yellow-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {loading ? "Calculating Rates..." : "Get Shipping Rates"}
              </button>
            </form>

            {rates.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-medium text-white mb-6">
                  Available Shipping Options
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rates.map((rate) => (
                    <div
                      key={rate.rateId}
                      onClick={() => setrateId(rate.rateId)}
                      className={`p-6 rounded-xl border-2 transition-all cursor-pointer hover:border-black ${rateId === rate.rateId ? "border-black bg-black/5" : "border-gray-200"}`}
                    >
                      <div className="flex items-start gap-4">
                        <input
                          type="radio"
                          name="shippingRate"
                          checked={rateId === rate.rateId}
                          onChange={() => setrateId(rate.rateId)}
                          className="mt-1 h-4 w-4 text-black focus:ring-black"
                        />
                        <div className="flex-1">
                          <p className="text-lg font-medium text-black">
                            {rate.carrierFriendlyName}
                          </p>
                          <p className="text-gray-600 mt-1">
                            {rate.serviceType}
                          </p>
                          <p className="text-2xl font-bold text-black mt-2">
                            ${rate.shippingAmount.amount}{" "}
                            <span className="text-sm font-normal text-gray-600">
                              {rate.shippingAmount.currency}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {rateId && (
              <div className="mt-8">
                <button
                  onClick={handleCreateLabel}
                  disabled={loading}
                  className="w-full bg-yellow-600 text-black py-4 rounded-lg hover:bg-yellow-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {loading ? "Creating Label..." : "Create Shipping Label"}
                </button>
              </div>
            )}

            {labelPdf && (
              <div className="mt-6">
                <Link
                  href={labelPdf}
                  target="_blank"
                  className="inline-flex w-full items-center justify-center px-6 py-4 bg-white text-black border-2 border-black rounded-lg hover:bg-black hover:text-white transition-colors"
                >
                  Download Shipping Label
                </Link>
              </div>
            )}

            {trackingObj && (
              <div className="mt-12 p-6 bg-yellow- rounded-xl">
                <h2 className="text-2xl font-medium text-black mb-4">
                  Tracking Information
                </h2>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <span className="font-medium">Tracking Number:</span>{" "}
                    {trackingObj.trackingNumber}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Label ID:</span>{" "}
                    {trackingObj.labelId}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Carrier:</span>{" "}
                    {trackingObj.carrierCode}
                  </p>
                  <div className="mt-6">
                    <Link
                      href={`/tracking/?labelId=${trackingObj.labelId}`}
                      className="inline-flex items-center justify-center px-6 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors w-full"
                    >
                      Track Order
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {errors.length > 0 && (
              <div className="mt-8 p-6 bg-red-50 rounded-xl">
                <h2 className="text-lg font-medium text-red-800 mb-4">
                  Error Details
                </h2>
                <div className="space-y-2">
                  {errors.map((error, index) => (
                    <p key={index} className="text-red-600">
                      {error}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Feature />
    </>
  );
};

export default ShippingRatesPage;
