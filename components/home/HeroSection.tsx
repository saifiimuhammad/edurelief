"use client";

import { Button } from "@/components/ui/button";
import { Heart, Users, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";
import LightRays from "../LightRays";
import { BackgroundBeams } from "@/components/ui/shadcn-io/background-beams";
import { InteractiveGridPattern } from "@/components/ui/shadcn-io/interactive-grid-pattern";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  return (
    <div className="relative font-circular">
      <div className="relative flex h-[600px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
        <InteractiveGridPattern
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
          )}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 bg-transparent flex justify-center relative z-40">
          <div className="flex items-center justify-center flex-col space-y-8">
            <div className="flex items-center justify-center flex-col space-y-4">
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                <Heart className="h-4 w-4" />
                <span>Supporting UN Sustainable Development Goals</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight text-center">
                Empowering Students Through{" "}
                <span className="text-green-600 block">Community Support</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed text-center max-w-3xl">
                Help deserving students achieve their educational dreams. Every
                donation creates opportunity, breaks barriers, and builds a
                brighter future for all.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/browse">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Start Donating
                </Button>
              </Link>
              <Link href="/student/request">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-3"
                >
                  Need Funding?
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">150+</div>
                <div className="text-sm text-gray-600 mt-1">
                  Students Funded
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">PKR 2.3M</div>
                <div className="text-sm text-gray-600 mt-1">Total Raised</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">85%</div>
                <div className="text-sm text-gray-600 mt-1">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 bg-transparent relative z-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                <Heart className="h-4 w-4" />
                <span>Supporting UN Sustainable Development Goals</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Empowering Students Through
                <span className="text-green-600 block">Community Support</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Help deserving students achieve their educational dreams. Every
                donation creates opportunity, breaks barriers, and builds a
                brighter future for all.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/browse">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Start Donating
                </Button>
              </Link>
              <Link href="/student/request">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-3"
                >
                  Need Funding?
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">150+</div>
                <div className="text-sm text-gray-600 mt-1">
                  Students Funded
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">$2.3M</div>
                <div className="text-sm text-gray-600 mt-1">Total Raised</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">85%</div>
                <div className="text-sm text-gray-600 mt-1">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
