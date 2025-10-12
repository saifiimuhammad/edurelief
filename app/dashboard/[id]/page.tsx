"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

// Dynamically import Progress bar to avoid SSR issues
const Progress = dynamic(
  () => import("@/components/ui/progress").then((mod) => mod.Progress),
  { ssr: false }
);

interface Student {
  _id: string;
  name?: string;
  university?: string;
  course?: string;
  targetAmount?: number;
  raisedAmount?: number;
  createdAt?: string;
  status?: "pending" | "approved" | "rejected";
}

export default function DashboardPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Load students from API
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const res = await fetch(`/api/students?status=approved`, {
          cache: "no-store",
        });
        const data = await res.json();

        if (data.success && Array.isArray(data.students)) {
          setStudents(data.students);
        } else {
          setError(data.message || "No students found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load students");
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  // Loading state
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <p>Loading students...</p>
        </main>
        <Footer />
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </main>
        <Footer />
      </>
    );
  }

  // Main dashboard content
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {students.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">
              No approved students yet.
            </p>
          ) : (
            students.map((student) => {
              // Safe progress calculation
              const progress =
                student.raisedAmount && student.targetAmount
                  ? Math.min(
                      (student.raisedAmount / student.targetAmount) * 100,
                      100
                    )
                  : 0;

              return (
                <Card key={student._id}>
                  <CardHeader>
                    <h2 className="text-lg font-bold">
                      {student.name || "Unnamed Student"}
                    </h2>
                    <p className="text-gray-500">
                      {student.university || "Unknown University"}
                    </p>
                    <p className="text-gray-500">
                      {student.course || "Course not specified"}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-2">
                      <span className="font-medium text-gray-700">
                        Progress:
                      </span>{" "}
                      {progress.toFixed(2)}%
                    </div>
                    <Progress value={progress} />
                  </CardContent>
                  <CardFooter>
                    <p className="text-xs text-gray-400">
                      Status: {student.status || "pending"} | Joined:{" "}
                      {student.createdAt
                        ? new Date(student.createdAt).toLocaleDateString()
                        : "Unknown"}
                    </p>
                  </CardFooter>
                </Card>
              );
            })
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
