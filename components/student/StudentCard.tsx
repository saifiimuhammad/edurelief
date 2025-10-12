"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, GraduationCap, Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface StudentCardProps {
  student: {
    id: string;
    studentId: string;
    name: string;
    university: string;
    course: string;
    semester: string;
    targetAmount: number;
    raisedAmount: number;
    story: string;
    profileImage?: string;
  };
}

export default function StudentCard({ student }: StudentCardProps) {
  const [onHover, setOnHover] = useState<boolean>(false);

  const progressPercentage = Math.min(
    (student.raisedAmount / student.targetAmount) * 100,
    100
  );
  const remainingAmount = Math.max(
    student.targetAmount - student.raisedAmount,
    0
  );

  return (
    <Card
      className="h-full flex flex-col shadow-none hover:shadow-sm transition-shadow duration-200 outline-none border-none"
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      onClick={() => (window.location.href = `/student/${student.studentId}`)}
    >
      <CardHeader className="p-0">
        <div className={`relative h-48 w-full overflow-hidden rounded-t-lg`}>
          {student.profileImage ? (
            <Image
              src={student.profileImage}
              alt={student.name}
              fill
              className={`object-cover transition-transform duration-300 ${
                onHover ? "scale-110" : "scale-100"
              }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
              <GraduationCap className="h-16 w-16 text-green-600" />
            </div>
          )}
          <div className="absolute top-3 right-3">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-green-700">
              {progressPercentage.toFixed(0)}% funded
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between w-full">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-1">
                {student.name}
              </h3>
              <div className="py-1 px-2 bg-gray-50 rounded-sm text-xs flex gap-1">
                <Check className="h-4 w-4 text-green-500" /> Verified
              </div>
            </div>
            {/* <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{student.university}</span>
              </div>
              <div className="flex items-center">
                <GraduationCap className="h-4 w-4 mr-2" />
                <span>{student.course}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{student.semester}</span>
              </div>
            </div> */}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-gray-900">
                PKR {student.raisedAmount.toLocaleString()} of PKR{" "}
                {student.targetAmount.toLocaleString()}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-sm text-gray-600">
              PKR {remainingAmount.toLocaleString()} still needed
            </p>
          </div>

          <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
            {student.story}
          </p>
        </div>
      </CardContent>

      {/* <CardFooter className="p-6 pt-0 space-y-3">
        <Link href={`/student/${student.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Full Story
          </Button>
        </Link>
        <Link href={`/donate/${student.id}`} className="w-full">
          <Button className="w-full bg-green-600 hover:bg-green-700">
            <Heart className="h-4 w-4 mr-2" />
            Donate Now
          </Button>
        </Link>
      </CardFooter> */}
    </Card>
  );
}
