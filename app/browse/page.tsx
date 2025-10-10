"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StudentCard from "@/components/student/StudentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

export default function BrowsePage() {
  const [students, setStudents] = useState<any[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [filterBy, setFilterBy] = useState("all");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    loadStudents();
  }, [page]);

  useEffect(() => {
    filterAndSortStudents();
  }, [students, searchTerm, sortBy, filterBy]);

  // 🔹 Fetch approved students from your API
  const loadStudents = async () => {
    try {
      const res = await fetch(
        `/api/students?search=${searchTerm}&filter=${filterBy}&sort=${sortBy}&page=${page}&limit=6`,
        { cache: "no-store" }
      );
      const data = await res.json();

      if (data.success && data.students) {
        setStudents(data.students);
        setPages(data.pagination.pages);
      } else {
        setStudents([]);
        console.error("No students found:", data.message);
      }
    } catch (err) {
      console.error("Error loading students:", err);
    }
  };

  const filterAndSortStudents = () => {
    let filtered = [...students];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (student) =>
          student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.university
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          student.course?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filterBy !== "all") {
      if (filterBy === "urgent") {
        filtered = filtered.filter((student) => {
          const progress = (student.raisedAmount / student.targetAmount) * 100;
          return progress < 25;
        });
      } else if (filterBy === "nearly-funded") {
        filtered = filtered.filter((student) => {
          const progress = (student.raisedAmount / student.targetAmount) * 100;
          return progress >= 75;
        });
      }
    }

    // Sorting
    if (sortBy === "recent") {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortBy === "progress") {
      filtered.sort((a, b) => {
        const progressA = (a.raisedAmount / a.targetAmount) * 100;
        const progressB = (b.raisedAmount / b.targetAmount) * 100;
        return progressB - progressA;
      });
    } else if (sortBy === "amount") {
      filtered.sort(
        (a, b) =>
          b.targetAmount - b.raisedAmount - (a.targetAmount - a.raisedAmount)
      );
    }

    setFilteredStudents(filtered);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Browse Students
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover amazing students working toward their educational
                dreams. Every contribution makes a difference.
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, university, or course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-4">
                <Select value={filterBy} onValueChange={setFilterBy}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Students</SelectItem>
                    <SelectItem value="urgent">Urgent (Under 25%)</SelectItem>
                    <SelectItem value="nearly-funded">
                      Nearly Funded (75%+)
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="progress">By Progress</SelectItem>
                    <SelectItem value="amount">By Amount Needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Students Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filteredStudents.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No students found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setFilterBy("all");
                  setSortBy("recent");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-gray-600">
                  Showing {filteredStudents.length}{" "}
                  {filteredStudents.length === 1 ? "student" : "students"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredStudents.map((student) => (
                  <StudentCard key={student._id} student={student} />
                ))}
              </div>
              <div className="flex justify-center mt-8 gap-4">
                <Button disabled={page <= 1} onClick={() => setPage(page - 1)}>
                  Previous
                </Button>
                <span className="flex items-center">
                  Page {page} of {pages}
                </span>
                <Button
                  disabled={page >= pages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
