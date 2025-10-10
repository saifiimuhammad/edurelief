import Link from "next/link";
import { Heart, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">Edufund</span>
            </Link>
            <p className="text-gray-600 mb-4 max-w-md">
              Empowering students to achieve their educational dreams through
              community support. Together, we&apos;re building a more educated
              and equitable world.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-green-600 cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-green-600 cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-green-600 cursor-pointer" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-green-600 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/browse"
                  className="text-gray-600 hover:text-green-600"
                >
                  Browse Students
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-gray-600 hover:text-green-600"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="" className="text-gray-600 hover:text-green-600">
                  Our Impact
                </Link>
              </li>
              <li>
                <Link href="" className="text-gray-600 hover:text-green-600">
                  Start Fundraising
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="" className="text-gray-600 hover:text-green-600">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="" className="text-gray-600 hover:text-green-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="" className="text-gray-600 hover:text-green-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="" className="text-gray-600 hover:text-green-600">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2024 Edufund. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-sm text-gray-500">Supporting UN SDGs:</span>
              <div className="flex space-x-2">
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  SDG 1
                </div>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  SDG 2
                </div>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  SDG 4
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
