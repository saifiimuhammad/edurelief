"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Student = {
  _id: string;
  name: string;
  email: string;
  role: string;
  profileImage?: string;
  phone?: string;
  address?: string;
  studentId: string;
  university?: string;
  course?: string;
  semester?: string;
  targetAmount?: number;
  raisedAmount?: number;
  story?: string;
  cnic?: string;
  father_cnic?: string;
  utility_bill?: string;
  income_proof?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export default function StudentDashboardPage() {
  const params = useParams();
  const { id } = params as { id: string };
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(`/api/students/${id}`);
        const data = await res.json();
        console.log(data);

        if (data.success && data.student) {
          setStudent(data.student);
        } else {
          setError(data.message || "Student not found");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading student data...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-8">
        <div className="max-w-5xl mx-auto p-6">
          <div className="flex flex-col md:flex-row gap-x-6 items-center">
            <Image
              src={student?.profileImage || "/placeholder-avatar.png"}
              alt={student?.name as string}
              width={0}
              height={0}
              className="w-32 h-32 rounded-full object-cover border border-gray-200 md:pr-20"
            />
            <div className="w-full flex items-center justify-between">
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">{student?.name}</h1>
                <p className="text-gray-600 mb-1">Email: {student?.email}</p>
                <p
                  className={`mb-1 inline-flex items-center gap-2 font-semibold ${
                    student?.status === "approved"
                      ? "bg-green-200"
                      : student?.status === "pending"
                      ? "bg-yellow-200"
                      : "bg-red-200"
                  } py-1 px-3 rounded-full`}
                >
                  <span
                    className={`h-3 w-3 rounded-full ${
                      student?.status === "approved"
                        ? "bg-green-600"
                        : student?.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-red-600"
                    }`}
                  ></span>
                  Status:{" "}
                  {student?.status
                    ? student.status.charAt(0).toUpperCase() +
                      student.status.slice(1)
                    : "N/A"}
                </p>
              </div>
              <div className="flex-1">
                <p className="text-gray-600 mb-1">
                  Phone: {student?.phone || "N/A"}
                </p>
                <p className="text-gray-600 mb-1">
                  Address: {student?.address || "N/A"}
                </p>
                <p className="text-gray-600 mb-1">
                  Student ID: {student?.studentId}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Academic Info</h2>
              <p className="text-gray-700">
                University: {student?.university || "N/A"}
              </p>
              <p className="text-gray-700">
                Course: {student?.course || "N/A"}
              </p>
              <p className="text-gray-700">
                Semester: {student?.semester || "N/A"}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Donation Info</h2>
              <p className="text-gray-700">
                Target Amount: {student?.targetAmount || 0} PKR
              </p>
              <p className="text-gray-700">
                Raised Amount: {student?.raisedAmount || 0} PKR
              </p>
              <p className="text-gray-700">
                Progress:{" "}
                {student?.targetAmount
                  ? Math.min(
                      100,
                      Math.round(
                        (student.raisedAmount! / student.targetAmount) * 100
                      )
                    )
                  : 0}
                %
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Personal Documents</h2>
            {/* <p className="text-gray-700">CNIC: {student?.cnic || "N/A"}</p> */}
            <div className="w-full flex items-start justify-start gap-4">
              <div>
                <h3 className="text-sm font-medium">CNIC:</h3>
                <Image
                  src={student?.cnic as string}
                  alt={"cnic image"}
                  width={0}
                  height={0}
                  className="w-32 h-auto"
                />
              </div>
              <div>
                <h3 className="text-sm font-medium">Father CNIC:</h3>
                <Image
                  src={student?.father_cnic as string}
                  alt={"father cnic image"}
                  width={0}
                  height={0}
                  className="w-32 h-auto"
                />
              </div>
            </div>

            <p className="text-gray-700">
              Utility Bill:{" "}
              {student?.utility_bill ? (
                <a
                  href={student.utility_bill}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  View
                </a>
              ) : (
                "N/A"
              )}
            </p>
            <p className="text-gray-700">
              Income Proof:{" "}
              {student?.income_proof ? (
                <a
                  href={student.income_proof}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  View
                </a>
              ) : (
                "N/A"
              )}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Story</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {student?.story || "No story provided."}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
