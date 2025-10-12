"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setCurrentUser(JSON.parse(user));
  }, []);

  const handleSignout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/browse"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Browse Students
            </Link>
            <Link
              href="/how-it-works"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/our-impact"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Our Impact
            </Link>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1">
            <Heart className="h-5 w-5 text-green-600" />
            <span className="text-xl font-bold text-gray-900">Edufund</span>
          </Link>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <>
                <Link href="">
                  <Button variant="ghost" size="sm" className="w-full">
                    About Us
                  </Button>
                </Link>
                <Link
                  href={
                    currentUser.role === "student"
                      ? `/dashboard/${currentUser.studentId}`
                      : currentUser.role === "admin"
                      ? "/admin"
                      : `/donor/${currentUser._id}`
                  }
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <User className="h-4 w-4" />
                    <span>{currentUser.name}</span>
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleSignout}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="">
                  <Button variant="ghost" size="sm" className="w-full">
                    About Us
                  </Button>
                </Link>
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
            {/* <Link href="/student/request">
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                Start Fundraising
              </Button>
            </Link> */}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="/browse"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Browse Students
              </Link>
              <Link
                href="/how-it-works"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                How It Works
              </Link>
              <Link
                href=""
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                Our Impact
              </Link>

              <div className="pt-4 border-t border-gray-200 space-y-2">
                {currentUser ? (
                  <>
                    <Link href="">
                      <Button variant="ghost" size="sm" className="w-full">
                        About Us
                      </Button>
                    </Link>
                    <Link
                      href={
                        currentUser.role === "student"
                          ? `/dashboard/${currentUser.studentId}`
                          : `/donor/${currentUser._id}`
                      }
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        {currentUser.name}
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={handleSignout}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="">
                      <Button variant="ghost" size="sm" className="w-full">
                        About Us
                      </Button>
                    </Link>
                    <Link href="/auth/signin">
                      <Button variant="ghost" size="sm" className="w-full mb-2">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth/signup">
                      <Button
                        size="sm"
                        className="w-full bg-green-600 hover:bg-green-700 mb-2"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
                {/* <Link href="/student/request">
                  <Button
                    size="sm"
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Start Fundraising
                  </Button>
                </Link> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
