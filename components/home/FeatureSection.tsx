
import { Database } from "@/lib/database";

import StudentCard from "@/components/student/StudentCard";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function FeatureSection(){

// Get featured students (approved ones)
  const featuredStudents = await Database.getStudents("approved");
  const displayStudents = featuredStudents.slice(0, 3);
    return(
         <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-circular">
                Meet Students Who Need Your Support
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every student has a unique story and dream. Your contribution
                can make the difference between dropping out and graduating.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {displayStudents.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/browse">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-3"
                >
                  View All Students
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
    )
}