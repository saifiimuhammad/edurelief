"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border border-gray-200 rounded-xl p-6 shadow-sm cursor-pointer transition"
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">{q}</h3>
        <ChevronDown
          className={`w-5 h-5 text-gray-600 transform transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ${
          open ? "max-h-40 mt-3" : "max-h-0"
        }`}
      >
        <p className="text-gray-600">{a}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const faqs = [
    {
      q: "Is it free to start a fundraiser?",
      a: "Yes. Starting a fundraiser on EduRelief is completely free. You only pay a small transaction fee charged by the payment processor when you receive donations.",
    },
    {
      q: "How do I withdraw the funds?",
      a: "Simply connect your bank account during setup. Once donations come in, you can withdraw them anytime—securely and directly to your account.",
    },
    {
      q: "Who can donate to my fundraiser?",
      a: "Anyone across the world can contribute to your EduRelief campaign using a credit or debit card through our secure Stripe integration.",
    },
    {
      q: "Do I need to reach my goal to get the money?",
      a: "No. You receive all donations you collect, even if you don’t meet your campaign goal.",
    },
  ];

  return (
    <section className="py-20 bg-white border-t">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
