import Link from "next/link";
import Image from "next/image";

export default function Confirmation() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-lg">
        <div className="mb-6 flex justify-center">
          <Image
            src="/globe.svg"
            alt="Travel confirmed"
            width={80}
            height={80}
            className="dark:invert"
          />
        </div>
        <h1 className="text-3xl font-bold mb-4">Your Trip is Confirmed!</h1>
        <p className="mb-8 text-lg">
          Thank you for booking with EZ Travel. We've sent all the details to
          your email.
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
          <ul className="text-left space-y-3">
            <li className="flex items-start gap-2">
              <svg
                className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
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
              <span>
                Check your email for your booking confirmation and e-tickets
              </span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
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
              <span>Save your itinerary to your calendar</span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
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
              <span>Pack your bags and get ready for your adventure!</span>
            </li>
          </ul>
        </div>

        <Link
          href="/trip"
          className="inline-block py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-center transition-colors"
        >
          View My Itinerary
        </Link>
      </div>
    </div>
  );
}
