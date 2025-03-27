"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Payment() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Mock price (in a real app, this would come from your API or state management)
  const price = 1299;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Mock payment processing
    setTimeout(() => {
      // In a real app, you would integrate with Stripe here
      setIsProcessing(false);
      setIsSuccess(true);

      // In a real app, you would send a confirmation email here

      // Redirect to confirmation page after a delay
      setTimeout(() => {
        router.push("/confirmation");
      }, 3000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-100 p-4">
              <svg
                className="h-12 w-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="mb-4">We've sent a confirmation email to {email}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            You'll be redirected to the confirmation page momentarily...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Complete Your Booking
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
          <div className="flex justify-between items-center mb-4">
            <span>Trip to Paris, France</span>
            <span className="font-bold">${price.toLocaleString()}</span>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${price.toLocaleString()} USD</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700"
                placeholder="Your confirmation will be sent here"
                required
              />
            </div>

            <div className="mb-8">
              <p className="text-sm mb-4">Payment powered by Stripe</p>
              <div className="border p-4 rounded-md">
                {/* In a real app, this is where your Stripe Elements would go */}
                <p className="mb-4">Credit Card Information</p>
                <div className="space-y-4">
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md dark:bg-gray-700"
                    placeholder="Card number"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      className="px-4 py-2 border rounded-md dark:bg-gray-700"
                      placeholder="MM/YY"
                      required
                    />
                    <input
                      type="text"
                      className="px-4 py-2 border rounded-md dark:bg-gray-700"
                      placeholder="CVC"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium"
              disabled={isProcessing}
            >
              {isProcessing
                ? "Processing..."
                : `Pay $${price.toLocaleString()} USD`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
