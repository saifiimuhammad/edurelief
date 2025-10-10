"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Heart,
  Trash2,
  Edit3,
  Calendar,
  Phone,
  MapPin,
  X,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DonorProfilePage() {
  const { id } = useParams();
  const router = useRouter();

  const [donor, setDonor] = useState<any>(null);
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) loadDonorData();
  }, [id]);

  const loadDonorData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/donors/${id}`, { cache: "no-store" });
      const data = await res.json();

      if (!res.ok || !data.success) throw new Error(data.message);
      setDonor(data.donor);
      setForm({
        name: data.donor.name || "",
        email: data.donor.email || "",
        phone: data.donor.phone || "",
        address: data.donor.address || "",
        profileImage: data.donor.profileImage || "",
      });

      const donationRes = await fetch(`/api/donations/donor/${id}`, {
        cache: "no-store",
      });
      if (donationRes.ok) {
        const donationData = await donationRes.json();
        setDonations(donationData.donations || []);
      }
    } catch (err) {
      console.error(err);
      setDonor(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProfile = async () => {
    if (!confirm("Are you sure you want to delete your profile?")) return;
    try {
      const res = await fetch(`/api/donors/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert("Profile deleted successfully!");
      router.push("/");
    } catch (error: any) {
      alert(error.message || "Failed to delete profile");
    }
  };

  const handleEditSubmit = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/donors/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message);
      alert("Profile updated!");
      setDonor(data.donor);
      setEditing(false);
    } catch (err: any) {
      alert(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
          <div className="text-center">
            <div className="animate-spin h-10 w-10 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-3"></div>
            <p className="text-gray-600">Loading donor profile...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!donor) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            Donor Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The donor profile you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const totalDonated = donations.reduce((acc, d) => acc + d.amount, 0);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Donor Profile Section */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="shadow-lg border-green-100">
                <CardHeader className="bg-green-50 rounded-t-lg">
                  <CardTitle className="flex items-center text-lg text-green-800">
                    <User className="h-5 w-5 mr-2 text-green-600" />
                    Donor Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-gray-700 pt-4">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-green-100 flex items-center justify-center ring-2 ring-green-200">
                      {donor.profileImage ? (
                        <Image
                          src={donor.profileImage}
                          alt={donor.name}
                          width={96}
                          height={96}
                          className="object-cover"
                        />
                      ) : (
                        <User className="h-10 w-10 text-green-600" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {donor.name}
                      </h2>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Mail className="h-4 w-4 mr-1" /> {donor.email}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-gray-600 pt-2 border-t">
                    {donor.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-green-600" />
                        {donor.phone}
                      </div>
                    )}
                    {donor.address && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-green-600" />
                        {donor.address}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    <div className="flex justify-between text-gray-700">
                      <span>Total Donated</span>
                      <Badge className="bg-green-100 text-green-700">
                        PKR {totalDonated.toLocaleString()}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Donations Made</span>
                      <span>{donations.length}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-6">
                    <Button
                      variant="outline"
                      className="flex-1 flex items-center justify-center"
                      onClick={() => setEditing(true)}
                    >
                      <Edit3 className="h-4 w-4 mr-2" /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1 flex items-center justify-center"
                      onClick={handleDeleteProfile}
                    >
                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Donation History */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-md border-green-100">
                <CardHeader className="bg-green-50 rounded-t-lg">
                  <CardTitle className="flex items-center text-lg text-green-800">
                    <Heart className="h-5 w-5 mr-2 text-green-600" />
                    My Donations ({donations.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {donations.length > 0 ? (
                    <div className="space-y-4">
                      {donations.map((donation) => (
                        <div
                          key={donation._id}
                          className="p-4 bg-white rounded-lg flex justify-between items-center border border-green-50 hover:shadow-md transition"
                        >
                          <div>
                            <p className="font-medium text-gray-900">
                              To: {donation.studentName || "Anonymous Student"}
                            </p>
                            {donation.message && (
                              <p className="text-sm text-gray-600 mt-1 italic">
                                &quot;{donation.message}&quot;
                              </p>
                            )}
                            <p className="text-xs text-gray-500 mt-1 flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(
                                donation.createdAt
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge className="bg-green-100 text-green-700">
                            PKR {donation.amount}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 mt-4">No donations made yet.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {editing && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl relative">
              <button
                onClick={() => setEditing(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                <X className="h-5 w-5" />
              </button>

              <h2 className="text-lg font-semibold mb-4 text-green-700">
                Edit Profile
              </h2>

              <form onSubmit={handleEditSubmit} className="space-y-3">
                {["name", "email", "phone", "address"].map((field) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={form[field as keyof typeof form]}
                    onChange={(e) =>
                      setForm({ ...form, [field]: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-green-400 outline-none"
                  />
                ))}

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center"
                  disabled={saving}
                >
                  {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Save Changes
                </Button>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
