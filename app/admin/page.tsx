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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Link from "next/link";

type Student = {
  studentId: string;
  name: string;
  email: string;
  totalReceived: number;
};
type Donation = {
  _id: string;
  donorId: {
    _id: string;
    name: string;
  };
  studentId: {
    _id: string;
    name: string;
  };
  amount: number;
  paymentid: string;
  message: string;
  createdAt: string;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    students: {
      total: 0,
      approved: 0,
      pending: 0,
      rejected: 0,
      top: [],
    },
    donations: {
      total: 0,
      raised: 0,
      average: 0,
      topDonors: [],
    },
  });

  const [donationTrendsData, setDonationTrendsData] = useState<
    { month: string; amount: number }[]
  >([]);

  const [recentDonations, setRecentDonations] = useState<Donation[]>([]);
  const [topDonors, setTopDonors] = useState<
    { donorId: string; name: string; email: string; totalDonated: number }[]
  >([]);
  const [topStudents, setTopStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await fetch("/admin/api/stats");
        const recentDonationsRes = await fetch("/admin/api/recent-donations");
        const donationTrendsRes = await fetch("/admin/api/donation-trend");

        const statsData = await statsRes.json();
        const recentDonationsData = await recentDonationsRes.json();
        const donationTrendsData = await donationTrendsRes.json();

        console.log(donationTrendsData.donationTrends);

        setStats({ ...statsData.stats });
        setDonationTrendsData(donationTrendsData.donationTrends);
        setRecentDonations(recentDonationsData.recentDonations);
        setTopDonors(statsData.stats.donations.topDonors);
        setTopStudents(statsData.stats.students.top);
      } catch (err) {
        console.error("Error fetching admin data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;

  const statusPieData = [
    { name: "Pending", value: stats.students.pending },
    { name: "Approved", value: stats.students.approved },
    { name: "Rejected", value: stats.students.rejected },
  ];
  const pieColors = ["#FACC15", "#22C55E", "#EF4444"];

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/admin/users"
            className="hover:bg-gray-100 hover:underline px-2 py-1 rounded-sm text-green-600"
          >
            Users
          </Link>
          <Link
            href="/admin/donations"
            className="hover:bg-gray-100 hover:underline px-2 py-1 rounded-sm text-green-600"
          >
            Donations
          </Link>
        </div>
        <p className="text-gray-500 text-sm mt-2 md:mt-0">
          Comprehensive overview of campaigns & donations
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Students"
          value={stats.students.total}
          color="from-green-400 to-emerald-500"
          icon="🎓"
        />
        <StatCard
          title="Pending Students"
          value={stats.students.pending}
          color="from-yellow-400 to-orange-400"
          icon="⏳"
        />
        <StatCard
          title="Total Donations"
          value={stats.donations.total}
          color="from-blue-400 to-indigo-500"
          icon="💸"
        />
        <StatCard
          title="Total Raised (PKR)"
          value={stats.donations.raised.toLocaleString()}
          color="from-purple-400 to-pink-500"
          icon="📈"
        />
        <StatCard
          title="Avg Donation (PKR)"
          value={stats.donations.average.toFixed(2)}
          color="from-cyan-400 to-blue-500"
          icon="📊"
        />
      </div>

      {/* Donation Trends & Status Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Donation Trends (Monthly)
          </h2>
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <BarChart data={donationTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#60A5FA" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Student Status
          </h2>
          <PieChart width={300} height={300}>
            <Pie
              data={statusPieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {statusPieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>

      {/* Top Donors & Students */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Top Donors
          </h2>
          <ul className="space-y-2">
            {topDonors.map((donor, idx) => (
              <li
                key={idx}
                className="flex justify-between px-4 py-2 bg-gray-50 rounded"
              >
                <span>{donor.name}</span>
                <span>PKR {donor.totalDonated.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Top Students
          </h2>
          <ul className="space-y-2">
            {topStudents.map((student, idx) => (
              <li
                key={idx}
                className="flex justify-between px-4 py-2 bg-gray-50 rounded"
              >
                <span>{student.name}</span>
                <span>PKR {student.totalReceived.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent Donations */}
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Recent Donations
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Student</th>
                <th className="p-2 border">Donor</th>
                <th className="p-2 border">Amount (PKR)</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentDonations.map((donation) => (
                <tr key={donation._id}>
                  <td className="p-2 border">{donation.studentId.name}</td>
                  <td className="p-2 border">{donation.donorId.name}</td>
                  <td className="p-2 border">
                    {donation.amount.toLocaleString()}
                  </td>
                  <td className="p-2 border">
                    {new Date(donation.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
      <p className="text-3xl font-bold mt-1">{value}</p>
    </motion.div>
  );
}
