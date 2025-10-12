"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Donation = {
  _id: string;
  donorId: string;
  donorEmail: string;
  studentId: string;
  amount: number;
  message?: string;
  paymentId: string;
  createdAt: string;
};

export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch("/admin/api/donations");
        const data = await res.json();
        if (data.success) setDonations(data.donations);
      } catch (err) {
        console.error("❌ Error fetching donations:", err);
      }
    };
    fetchDonations();
  }, []);

  const filtered = donations.filter(
    (d) =>
      d.donorEmail.toLowerCase().includes(search.toLowerCase()) ||
      d.paymentId.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div className="min-h-screen bg-[#f9fdfb] p-6">
      <h1 className="text-3xl font-semibold text-[#00b964] mb-6">
        💸 All Donations
      </h1>

      <Card className="p-4 bg-white rounded-2xl shadow-sm border border-[#e3f3ec]">
        <div className="flex justify-between items-center mb-4">
          <Input
            placeholder="Search by donor email or payment ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
          <p className="text-gray-500 text-sm">
            Total Donations:{" "}
            <span className="font-medium text-gray-700">
              {donations.length}
            </span>
          </p>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#f4faf7]">
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Donor Email</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment ID</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((donation, i) => (
                <>
                  <TableRow
                    key={donation._id}
                    className="hover:bg-[#f4faf7] cursor-pointer transition"
                    onClick={() =>
                      setExpandedRow(
                        expandedRow === donation._id ? null : donation._id
                      )
                    }
                  >
                    <TableCell>{(currentPage - 1) * perPage + i + 1}</TableCell>
                    <TableCell>{donation.donorEmail}</TableCell>
                    <TableCell>{donation.studentId}</TableCell>
                    <TableCell className="font-medium text-[#00b964]">
                      PKR {donation.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>{donation.paymentId}</TableCell>
                    <TableCell>
                      {new Date(donation.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>

                  {/* Expandable details row */}
                  <AnimatePresence>
                    {expandedRow === donation._id && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-[#f9fdfb]"
                      >
                        <TableCell colSpan={6} className="p-4">
                          <div className="flex flex-col md:flex-row justify-between gap-4 text-sm text-gray-700">
                            <div>
                              <p>
                                <span className="font-medium">Donor ID:</span>{" "}
                                {donation.donorId}
                              </p>
                              <p>
                                <span className="font-medium">Student ID:</span>{" "}
                                {donation.studentId}
                              </p>
                              <p>
                                <span className="font-medium">Payment ID:</span>{" "}
                                {donation.paymentId}
                              </p>
                            </div>
                            <div>
                              <p>
                                <span className="font-medium">Message:</span>{" "}
                                {donation.message || "—"}
                              </p>
                              <p>
                                <span className="font-medium">Created:</span>{" "}
                                {new Date(donation.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-2">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </Button>
          <span className="text-gray-600 text-sm mt-2">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
}
