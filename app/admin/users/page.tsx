"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  address?: string;
  profileImage?: string;
  studentId?: string;
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
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function AdminUsersPage() {
  const [students, setStudents] = useState<User[]>([]);
  const [donors, setDonors] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [studentPage, setStudentPage] = useState(1);
  const [donorPage, setDonorPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/admin/api/users");
        const data = await res.json();
        if (data.success) {
          setStudents(data.students);
          setDonors(data.donors);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const toggleExpand = (id: string) =>
    setExpandedRow((prev) => (prev === id ? null : id));

  const handleSave = async () => {
    if (!editUser) return;
    try {
      const res = await fetch(`/admin/api/users/${editUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editUser),
      });
      const data = await res.json();
      if (data.success) {
        alert("✅ User updated successfully!");
        setEditUser(null);
        location.reload();
      } else throw new Error("Failed to update user");
    } catch (err) {
      console.error(err);
      alert("❌ Error updating user");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`/admin/api/users/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        alert("🗑️ User deleted successfully!");
        location.reload();
      } else throw new Error("Failed to delete");
    } catch (err) {
      console.error(err);
      alert("❌ Error deleting user");
    }
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-gray-500 text-lg font-medium">
        Loading Users...
      </div>
    );

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-[#f7fdf9] to-white text-gray-800 font-sans">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center text-[#00b964]"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Admin – All Users Overview
      </motion.h1>

      <UserTable
        title="🎓 Students"
        data={students}
        page={studentPage}
        setPage={setStudentPage}
        pageSize={pageSize}
        expandedRow={expandedRow}
        toggleExpand={toggleExpand}
        color="#00b964"
        setEditUser={setEditUser}
        handleDelete={handleDelete}
      />

      <UserTable
        title="💰 Donors"
        data={donors}
        page={donorPage}
        setPage={setDonorPage}
        pageSize={pageSize}
        expandedRow={expandedRow}
        toggleExpand={toggleExpand}
        color="#1ea672"
        setEditUser={setEditUser}
        handleDelete={handleDelete}
      />

      {/* EDIT MODAL */}
      <Dialog open={!!editUser} onOpenChange={() => setEditUser(null)}>
        <DialogContent className="max-w-3xl w-[95vw] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl">
          <DialogHeader className="sticky top-0 bg-white pb-2 z-10">
            <DialogTitle className="text-2xl text-[#00b964] font-semibold">
              ✏️ Edit User
            </DialogTitle>
          </DialogHeader>

          {editUser && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {Object.keys(editUser)
                .filter(
                  (k) => !["_id", "createdAt", "updatedAt", "__v"].includes(k)
                )
                .map((key) => (
                  <div key={key}>
                    <p className="text-sm text-gray-600 font-medium capitalize">
                      {key.replace(/_/g, " ")}
                    </p>
                    {typeof (editUser as any)[key] === "string" ? (
                      <Input
                        value={(editUser as any)[key] || ""}
                        onChange={(e) =>
                          setEditUser({
                            ...editUser,
                            [key]: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <Textarea
                        value={(editUser as any)[key] || ""}
                        onChange={(e) =>
                          setEditUser({
                            ...editUser,
                            [key]: e.target.value,
                          })
                        }
                      />
                    )}
                  </div>
                ))}
            </div>
          )}

          <DialogFooter className="mt-6 flex justify-end gap-4 sticky bottom-0 bg-white py-2">
            <Button variant="outline" onClick={() => setEditUser(null)}>
              Cancel
            </Button>
            <Button
              className="bg-[#00b964] text-white hover:bg-[#009e56]"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function UserTable({
  title,
  data,
  page,
  setPage,
  pageSize,
  expandedRow,
  toggleExpand,
  color,
  setEditUser,
  handleDelete,
}: any) {
  function paginate(data: User[], page: number) {
    return data.slice((page - 1) * pageSize, page * pageSize);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      <Card className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200">
        <CardContent className="p-6">
          <h2
            className="text-2xl font-semibold mb-4 flex items-center gap-2"
            style={{ color }}
          >
            {title}
          </h2>

          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginate(data, page).map((user) => (
                <>
                  <TableRow
                    key={user._id}
                    className="hover:bg-[#f5fbf7] cursor-pointer transition"
                    onClick={() => toggleExpand(user._id)}
                  >
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone || "—"}</TableCell>
                    <TableCell>{user.status || "—"}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant="outline"
                        className="border-[#00b964] text-[#00b964] hover:bg-[#00b964] hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditUser(user);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(user._id);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>

                  <AnimatePresence>
                    {expandedRow === user._id && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-[#f9fdfb]"
                      >
                        <TableCell colSpan={5} className="p-6">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                            <Info label="Address" value={user.address} />
                            <Info label="University" value={user.university} />
                            <Info label="Course" value={user.course} />
                            <Info label="Semester" value={user.semester} />
                            <Info label="Story" value={user.story} />
                          </div>

                          {/* 👇 All images in one horizontal flex row */}
                          <div className="flex flex-wrap gap-6 items-start border-t border-gray-200 pt-4">
                            {user.profileImage && (
                              <ImagePreview
                                label="Profile"
                                url={user.profileImage}
                              />
                            )}
                            {user.cnic && (
                              <ImagePreview label="CNIC" url={user.cnic} />
                            )}
                            {user.father_cnic && (
                              <ImagePreview
                                label="Father CNIC"
                                url={user.father_cnic}
                              />
                            )}
                            {user.utility_bill && (
                              <ImagePreview
                                label="Utility Bill"
                                url={user.utility_bill}
                              />
                            )}
                            {user.income_proof && (
                              <ImagePreview
                                label="Income Proof"
                                url={user.income_proof}
                              />
                            )}
                          </div>
                        </TableCell>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="border-[#00b964] text-[#00b964] hover:bg-[#00b964] hover:text-white"
            >
              Prev
            </Button>
            <span className="text-gray-500 font-medium">
              Page {page} of {Math.ceil(data.length / pageSize)}
            </span>
            <Button
              variant="outline"
              disabled={page === Math.ceil(data.length / pageSize)}
              onClick={() => setPage(page + 1)}
              className="border-[#00b964] text-[#00b964] hover:bg-[#00b964] hover:text-white"
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Info({ label, value }: { label: string; value?: string | number }) {
  return (
    <div>
      <p className="text-gray-600 font-semibold">{label}</p>
      <p className="text-gray-800">{value || "—"}</p>
    </div>
  );
}

function ImagePreview({
  label,
  url,
}: {
  label: string | undefined;
  url: string | undefined;
}) {
  if (!url) return null;
  return (
    <div className="col-span-full mt-2">
      <p className="text-gray-600 font-semibold mb-1">{label}</p>
      <a href={url} target="_blank" rel="noreferrer">
        <img
          src={url}
          alt={label}
          className="w-40 h-40 object-cover rounded-lg border border-gray-300 shadow"
        />
      </a>
    </div>
  );
}
