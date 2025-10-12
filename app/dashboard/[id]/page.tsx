"use client";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";

const Progress = dynamic(
  () => import("@/components/ui/progress").then((mod) => mod.Progress),
  {
    ssr: false,
  }
);
import { motion } from "framer-motion";
import { Edit, Target, Trash2, Users, X } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function StudentProfilePage() {
  const { id } = useParams();
  const router = useRouter();

  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [donations, setDonations] = useState<any[]>([]);

  useEffect(() => {
    if (id) fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/students/${id}`, { cache: "no-store" });
      const data = await res.json();

      if (data.success) {
        setStudent(data.student);
        setEditData(data.student);
      }

      setDonations([]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async () => {
    const res = await fetch(`/api/students/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    if (res.ok) {
      setIsEditing(false);
      fetchStudent();
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this student?")) return;
    await fetch(`/api/students/${id}`, { method: "DELETE" });
    router.push("/admin/students");
  };

  const handleInputChange = (field: string, value: any) => {
    setEditData((prev: any) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-600">
        No student found.
      </div>
    );
  }

  const progressPercentage = Math.min(
    (student.raisedAmount / (student.targetAmount || 1)) * 100,
    100
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white py-10">
        <div className="max-w-6xl mx-auto px-6">
          {/* Profile Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {student.name}’s Profile
            </h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 border-green-500 text-green-700 hover:bg-green-50"
              >
                <Edit className="h-4 w-4" /> Edit
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Section */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-green-200">
                      <Image
                        src={student.profileImage || "/placeholder.png"}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900">
                        {student.name}
                      </h2>
                      <p className="text-gray-600">{student.email}</p>
                      <Badge
                        className={`mt-2 ${
                          student.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : student.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {student.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 text-sm text-gray-700">
                    <Info label="University" value={student.university} />
                    <Info label="Course" value={student.course} />
                    <Info label="Semester" value={student.semester} />
                    <Info label="Phone" value={student.phone} />
                    <Info label="Address" value={student.address} />
                    <Info label="Student ID" value={student.studentId} />
                    <Info label="Target Amount" value={student.targetAmount} />
                    <Info label="Raised Amount" value={student.raisedAmount} />
                    <Info
                      label="Joined"
                      value={new Date(student.createdAt).toLocaleDateString()}
                    />
                  </div>

                  {/* Image Section */}
                  <div className="mt-10">
                    <h3 className="text-lg font-medium mb-4 text-gray-900">
                      Documents
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {[
                        { label: "CNIC", url: student.cnic },
                        { label: "Father CNIC", url: student.father_cnic },
                        { label: "Utility Bill", url: student.utility_bill },
                        { label: "Income Proof", url: student.income_proof },
                      ].map(
                        (doc, idx) =>
                          doc.url && (
                            <div
                              key={idx}
                              className="w-40 h-40 bg-gray-100 rounded-lg overflow-hidden shadow-sm relative"
                            >
                              <Image
                                src={doc.url}
                                alt={doc.label}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs py-1 text-center">
                                {doc.label}
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </div>

                  {/* Story */}
                  {student.story && (
                    <div className="mt-10">
                      <h3 className="text-lg font-semibold mb-2 text-gray-900">
                        My Story
                      </h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {student.story}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Donations */}
              {donations.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-700">
                      <Users className="h-5 w-5" /> Supporters (
                      {donations.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {donations.map((d, i) => (
                      <div
                        key={i}
                        className="flex justify-between bg-green-50 px-4 py-2 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {d.donorEmail}
                          </p>
                          {d.message && (
                            <p className="text-sm text-gray-600 italic">
                              &quot;{d.message}&quot;
                            </p>
                          )}
                        </div>
                        <Badge className="bg-green-600 text-white">
                          PKR {d.amount}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <Target className="h-5 w-5" /> Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={progressPercentage} className="h-3" />
                  <div className="flex justify-between mt-3 text-sm">
                    <span className="text-gray-600">
                      PKR {student.raisedAmount}
                    </span>
                    <span className="text-gray-900 font-semibold">
                      PKR {student.targetAmount}
                    </span>
                  </div>
                  <p className="text-center mt-3 text-green-700 font-medium">
                    {progressPercentage.toFixed(0)}% Funded
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {/* Edit Modal */}
        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <div className="bg-white rounded-xl w-[90%] max-w-2xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Edit Profile</h2>
                <button onClick={() => setIsEditing(false)}>
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  "name",
                  "email",
                  "phone",
                  "address",
                  "university",
                  "course",
                  "semester",
                  "studentId",
                  "targetAmount",
                  "story",
                  "profileImage",
                  "cnic",
                  "father_cnic",
                  "utility_bill",
                  "income_proof",
                ].map((key) => (
                  <div key={key} className="flex flex-col">
                    <label className="text-sm text-gray-600 capitalize mb-1">
                      {key.replace(/_/g, " ")}
                    </label>

                    {/* 🖼️ Image Upload Fields */}
                    {[
                      "profileImage",
                      "cnic",
                      "father_cnic",
                      "utility_bill",
                      "income_proof",
                    ].includes(key) ? (
                      <input
                        type="file"
                        accept="image/*"
                        className="border border-gray-300 rounded-md px-2 py-1"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          const formData = new FormData();
                          formData.append("file", file);
                          formData.append(
                            "upload_preset",
                            "your_unsigned_preset"
                          );

                          const uploadRes = await fetch(
                            "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
                            { method: "POST", body: formData }
                          );
                          const uploadData = await uploadRes.json();

                          if (uploadData.secure_url) {
                            handleInputChange(key, uploadData.secure_url);
                          }
                        }}
                      />
                    ) : (
                      <input
                        type={
                          key === "email"
                            ? "email"
                            : key === "targetAmount"
                            ? "number"
                            : "text"
                        }
                        className="border border-gray-300 rounded-md px-2 py-1"
                        value={editData[key] || ""}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditSubmit} className="bg-green-600">
                  Save Changes
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </main>
      <Footer />
    </>
  );
}

// ✅ Reusable info component
function Info({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-gray-900 break-all">{value || "—"}</p>
    </div>
  );
}
