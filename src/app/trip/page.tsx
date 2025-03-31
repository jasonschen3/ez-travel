"use client";
import { useRouter } from "next/navigation";

export default function TripDetails() {
  const router = useRouter();

  const handlePayment = () => {
    router.push("/payment");
  };
  return (
    <div className="max-w-md mx-auto p-6 border-2 border-black m-4">
      <h1 className="text-2xl font-bold mb-4">Ez-Travels</h1>

      <h2 className="text-xl font-bold mb-6">Your Trip</h2>

      <div className="space-y-6">
        {/* Metz Stop */}
        <div className="flex flex-col">
          <div className="font-bold">Metz 10:00 am</div>
          <div className="border-l-2 border-black pl-4 ml-2 py-1">
            <div>Train on TGV</div>
            <div>1 hr 15 min</div>
            <div>$15.12</div>
          </div>
        </div>

        {/* Paris Stop */}
        <div className="flex flex-col">
          <div className="font-bold">Paris CDG 11:15 am</div>
          <div className="border-l-2 border-black pl-4 ml-2 py-1">
            <div>Flight on Ryanair</div>
            <div>2 hr</div>
            <div>$35.12</div>
          </div>
        </div>

        {/* Madrid Airport Stop */}
        <div className="flex flex-col">
          <div className="font-bold">Madrid Airport 12:15 pm</div>
          <div className="border-l-2 border-black pl-4 ml-2 py-1">
            <div>Uber</div>
            <div>15 min</div>
            <div>$8.12</div>
          </div>
        </div>

        {/* Madrid Hotel Stop */}
        <div className="flex flex-col">
          <div className="font-bold">Madrid Hotel 12:30 pm</div>
        </div>

        {/* Trip Summary */}
        <div className="mt-8 space-y-2">
          <div className="font-bold">Total Cost: $91</div>
          <div className="font-bold">Total Time: 2hr 30min</div>
        </div>

        {/* Change Trip Button */}
        <button
          className="w-full border-2 border-black py-2 px-4 mt-4 text-center font-bold"
          onClick={() => {
            /* Handle trip change */
          }}
        >
          Change Trip
        </button>
        <button
          className="w-full bg-blue-600 text-white py-2 px-4 text-center font-bold hover:bg-blue-700"
          onClick={handlePayment}
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}
