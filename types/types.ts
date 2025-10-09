type Student = {
  studentId: string;
  name: string;
  email: string;
  university: string;
  course: string;
  semester: string;
  targetAmount: number;
  raisedAmount: number;
  story: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  profileImage?: string;
  cnic: string;
  father_cnic: string;
  utility_bill: string;
  income_proof: string;
  address: string;
  phone: string;
};

export type { Student };
