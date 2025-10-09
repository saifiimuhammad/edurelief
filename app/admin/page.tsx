"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalDonations: 0,
    totalRaised: 0,
    donationTrends: [],
  });

  useEffect(() => {
    fetch("/admin/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-2 md:mt-0">
          Overview of all student campaigns & donations
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          color="from-green-400 to-emerald-500"
          icon="🎓"
        />
        <StatCard
          title="Total Donations"
          value={stats.totalDonations}
          color="from-blue-400 to-indigo-500"
          icon="💸"
        />
        <StatCard
          title="Total Raised (PKR)"
          value={stats.totalRaised.toLocaleString()}
          color="from-yellow-400 to-orange-500"
          icon="📈"
        />
      </div>

      {/* Donations Chart */}
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Donations Overview
        </h2>
        <div className="h-72 w-full">
          <ResponsiveContainer>
            <BarChart data={mockChartData(stats.totalDonations)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#60A5FA" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
  color,
  icon,
}: {
  title: string;
  value: number | string;
  color: string;
  icon: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`bg-gradient-to-br ${color} text-white shadow-lg rounded-2xl p-6 flex flex-col justify-center items-start`}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h2 className="text-lg font-medium opacity-90">{title}</h2>
      <p className="text-4xl font-bold mt-1">{value}</p>
    </motion.div>
  );
}

// Temporary mock chart data — you can replace this with actual trends from backend
function mockChartData(totalDonations: number) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  return months.map((m) => ({
    month: m,
    amount: Math.floor(Math.random() * totalDonations * 0.5 + 1000),
  }));
}
