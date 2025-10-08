"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Calendar,
  GraduationCap,
  Heart,
  Users,
  Clock,
  Target,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Database } from "@/lib/database";

export default function StudentProfilePage() {
  const { id } = useParams();
  const [student, setStudent] = useState<any>(null);
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadStudentData();
    }
  }, [id]);

  const loadStudentData = async () => {
    setLoading(true);
    try {
      const studentData = await Database.getStudentById(id as string);
      if (studentData) {
        setStudent(studentData);
        const studentDonations = await Database.getDonationsByStudent(
          id as string
        );
        setDonations(studentDonations);
      }
    } catch (error) {
      console.error("Error loading student data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading student profile...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!student) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Student Not Found
            </h1>
            <p className="text-gray-600 mb-4">
              The student profile you're looking for doesn't exist.
            </p>
            <Link href="/browse">
              <Button>Browse All Students</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const progressPercentage = Math.min(
    (student.raisedAmount / student.targetAmount) * 100,
    100
  );
  const remainingAmount = Math.max(
    student.targetAmount - student.raisedAmount,
    0
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-green-100 to-green-200">
                      {student.profileImage ? (
                        <Image
                          src={student.profileImage}
                          alt={student.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <GraduationCap className="h-12 w-12 text-green-600" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                      {student.name}
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{student.university}</span>
                      </div>
                      <div className="flex items-center">
                        <GraduationCap className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{student.course}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{student.semester}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        <span>
                          Posted{" "}
                          {new Date(student.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Student Story */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Heart className="h-5 w-5 mr-2 text-green-600" />
                      My Story
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {student.story}
                    </p>
                  </CardContent>
                </Card>

                {/* Recent Donations */}
                {donations.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-xl">
                        <Users className="h-5 w-5 mr-2 text-green-600" />
                        Recent Support ({donations.length} donations)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {donations.slice(0, 5).map((donation) => (
                          <div
                            key={donation.id}
                            className="flex justify-between items-start p-4 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <div className="font-medium text-gray-900">
                                Anonymous Donor
                              </div>
                              {donation.message && (
                                <p className="text-sm text-gray-600 mt-1 italic">
                                  "{donation.message}"
                                </p>
                              )}
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(
                                  donation.createdAt
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge
                              variant="secondary"
                              className="text-green-700 bg-green-100"
                            >
                              PKR {donation.amount}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar - Donation Info */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <Target className="h-5 w-5 mr-2 text-green-600" />
                        Funding Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Raised</span>
                          <span className="font-medium">
                             PKR {student.raisedAmount.toLocaleString()} of PKR {" "}
                            {student.targetAmount.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={progressPercentage} className="h-3" />
                        <div className="text-center">
                          <span className="text-2xl font-bold text-green-600">
                            {progressPercentage.toFixed(0)}%
                          </span>
                          <span className="text-gray-600 ml-2">funded</span>
                        </div>
                      </div>

                      <div className="space-y-3 pt-4 border-t">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Still needed</span>
                          <span className="font-semibold text-gray-900">
                          PKR {remainingAmount.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Supporters</span>
                          <span className="font-semibold text-gray-900">
                            {donations.length}
                          </span>
                        </div>
                      </div>

                      <Link href={`/donate/${student.id}`} className="block">
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">
                          <Heart className="h-5 w-5 mr-2" />
                          Donate Now
                        </Button>
                      </Link>

                      <p className="text-xs text-gray-500 text-center">
                        Secure payment processing via Stripe. Your donation goes
                        directly to {student.name}'s education.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Share Card */}
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-medium text-gray-900 mb-3">
                        Help spread the word
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Share {student.name}'s story with your friends and
                        family.
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Share
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Copy Link
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
