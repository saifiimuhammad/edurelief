"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function StudentAdminPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStudents = async () => {
    setLoading(true);
    const res = await fetch("/api/students?status=pending");
    const data = await res.json();
    setStudents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  async function handleAction(id: string, action: "approve" | "reject") {
    await fetch(`/admin/api/${action}-student`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchStudents();
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-4xl font-bold text-gray-900">Pending Students</h1>
        <p className="text-gray-500 text-sm mt-2 md:mt-0">
          Approve or reject new student campaigns
        </p>
      </header>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : students.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow-sm text-center text-gray-500">
          No pending students 🎓
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-2xl overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Name</th>
                <th className="px-6 py-3 text-left font-semibold">Email</th>
                <th className="px-6 py-3 text-left font-semibold">
                  University
                </th>
                <th className="px-6 py-3 text-left font-semibold">
                  Target (PKR)
                </th>
                <th className="px-6 py-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((s: any, index: number) => (
                <motion.tr
                  key={s._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {s.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{s.email}</td>
                  <td className="px-6 py-4 text-gray-600">{s.university}</td>
                  <td className="px-6 py-4 text-gray-800 font-semibold">
                    {s.targetAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 flex justify-center space-x-3">
                    <button
                      onClick={() => handleAction(s._id, "approve")}
                      className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium shadow-sm hover:shadow-md transition-all"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(s._id, "reject")}
                      className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 text-white font-medium shadow-sm hover:shadow-md transition-all"
                    >
                      Reject
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
