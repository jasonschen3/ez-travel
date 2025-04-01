import React, { useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface TicketViewProps {
  isOpen: boolean;
  onClose: () => void;
  ticketImage: string;
  ticketType: string;
  from: string;
  to: string;
}

export default function TicketView({ isOpen, onClose, ticketImage, ticketType, from, to }: TicketViewProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative z-50 max-h-[90vh] max-w-[90vw] overflow-auto rounded-lg bg-white p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <X size={24} />
        </button>
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">{ticketType} Ticket</h2>
          <p className="mt-2 text-gray-600">{from} → {to}</p>
        </div>
        <div className="w-full flex flex-col items-center gap-6">
          <img
            src={ticketImage}
            alt={`${ticketType} Ticket`}
            className="w-full h-auto"
          />
          <button
            onClick={() => alert("Added to Apple Wallet!")}
            className="cursor-pointer hover:opacity-90 transition-opacity"
          >
            <Image
              src="/apple_wallet.png"
              alt="Add to Apple Wallet"
              width={200}
              height={40}
            />
          </button>
        </div>
      </div>
    </div>
  );
} 