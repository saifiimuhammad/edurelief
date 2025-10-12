"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CircleCheck as CheckCircle,
  Heart,
  Share2,
  Chrome as Home,
} from "lucide-react";
import Link from "next/link";

export default function DonationSuccessPage() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const studentName = searchParams.get("student");

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="text-center">
            <CardHeader className="pb-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900">
                Thank You for Your Generosity!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-lg text-gray-700">
                  Your donation of{" "}
                  <span className="font-bold text-green-600">PKR {amount}</span>{" "}
                  to{" "}
                  <span className="font-semibold">
                    {decodeURIComponent(studentName || "")}
                  </span>{" "}
                  has been processed successfully.
                </p>
                <p className="text-gray-600">
                  You&apos;ll receive a confirmation email shortly with your
                  donation receipt.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <Heart className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-green-900 mb-2">
                  Your Impact
                </h3>
                <p className="text-sm text-green-800">
                  Your contribution brings{" "}
                  {decodeURIComponent(studentName || "this student")} one step
                  closer to achieving their educational dreams. You&apos;ll
                  receive updates on their progress and achievements.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">
                  What happens next?
                </h3>
                <div className="text-left space-y-3 text-sm text-gray-600">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <p>The student will be notified of your support</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <p>
                      Funds will be transferred directly to their educational
                      expenses
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <p>
                      You&apos;ll receive updates on their academic progress
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Link href="/browse" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <Heart className="h-4 w-4 mr-2" />
                    Help Another Student
                  </Button>
                </Link>
                <Button variant="outline" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share This Story
                </Button>
                <Link href="/" className="flex-1">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Home className="h-4 w-4 mr-2" />
                    Return Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
