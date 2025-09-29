// Database configuration and connection
interface StudentRequest {
  id: string;
  studentId: string;
  name: string;
  email: string;
  university: string;
  course: string;
  semester: string;
  targetAmount: number;
  raisedAmount: number;
  story: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  profileImage?: string;
}

interface Donation {
  id: string;
  donorEmail: string;
  studentId: string;
  amount: number;
  message?: string;
  createdAt: Date;
  paymentId: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'donor' | 'admin';
  createdAt: Date;
}

// In-memory database simulation for demo
export class Database {
  private static students: StudentRequest[] = [
    {
      id: '1',
      studentId: 'student1',
      name: 'Sarah Chen',
      email: 'sarah.chen@university.edu',
      university: 'State University',
      course: 'Computer Science',
      semester: 'Fall 2024',
      targetAmount: 5000,
      raisedAmount: 2000,
      story: 'I\'m a first-generation college student pursuing Computer Science. My family works hard but struggles to afford my semester fees. With your support, I can continue my education and work towards my dream of becoming a software engineer to help my community.',
      status: 'approved',
      createdAt: new Date('2024-01-15'),
      profileImage: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg'
    },
    {
      id: '2',
      studentId: 'student2',
      name: 'Marcus Johnson',
      email: 'marcus.j@college.edu',
      university: 'Community College',
      course: 'Engineering',
      semester: 'Spring 2024',
      targetAmount: 3500,
      raisedAmount: 800,
      story: 'After serving in the military, I\'m using my GI benefits to study engineering. However, additional costs for specialized equipment and lab fees are challenging. Your donation will help me complete my degree and pursue a career in renewable energy.',
      status: 'approved',
      createdAt: new Date('2024-02-01'),
      profileImage: 'https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg'
    },
    {
      id: '3',
      studentId: 'student3',
      name: 'Priya Patel',
      email: 'priya.patel@university.edu',
      university: 'Medical University',
      course: 'Pre-Med',
      semester: 'Fall 2024',
      targetAmount: 7000,
      raisedAmount: 4200,
      story: 'I\'m working towards becoming a doctor to serve underserved communities. Medical school preparation requires significant investment in courses and materials. Every donation brings me closer to my goal of providing healthcare to those who need it most.',
      status: 'approved',
      createdAt: new Date('2024-01-20'),
      profileImage: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg'
    }
  ];

  private static donations: Donation[] = [
    {
      id: '1',
      donorEmail: 'donor1@example.com',
      studentId: '1',
      amount: 500,
      message: 'Best of luck with your studies!',
      createdAt: new Date('2024-01-16'),
      paymentId: 'pi_demo_1'
    },
    {
      id: '2',
      donorEmail: 'donor2@example.com',
      studentId: '1',
      amount: 1500,
      message: 'Education is the key to success. Keep going!',
      createdAt: new Date('2024-01-20'),
      paymentId: 'pi_demo_2'
    },
    {
      id: '3',
      donorEmail: 'donor3@example.com',
      studentId: '2',
      amount: 300,
      message: 'Thank you for your service!',
      createdAt: new Date('2024-02-05'),
      paymentId: 'pi_demo_3'
    },
    {
      id: '4',
      donorEmail: 'donor4@example.com',
      studentId: '3',
      amount: 1000,
      message: 'Future doctors need our support!',
      createdAt: new Date('2024-02-10'),
      paymentId: 'pi_demo_4'
    }
  ];

  private static users: User[] = [
    {
      id: 'student1',
      email: 'sarah.chen@university.edu',
      name: 'Sarah Chen',
      role: 'student',
      createdAt: new Date('2024-01-15')
    },
    {
      id: 'admin1',
      email: 'admin@edurelief.com',
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date('2024-01-01')
    }
  ];

  static async getStudents(status?: string): Promise<StudentRequest[]> {
    if (status) {
      return this.students.filter(s => s.status === status);
    }
    return [...this.students];
  }

  static async getStudentById(id: string): Promise<StudentRequest | null> {
    return this.students.find(s => s.id === id) || null;
  }

  static async addStudent(student: Omit<StudentRequest, 'id' | 'createdAt'>): Promise<StudentRequest> {
    const newStudent: StudentRequest = {
      ...student,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    this.students.push(newStudent);
    return newStudent;
  }

  static async updateStudent(id: string, updates: Partial<StudentRequest>): Promise<StudentRequest | null> {
    const index = this.students.findIndex(s => s.id === id);
    if (index === -1) return null;
    
    this.students[index] = { ...this.students[index], ...updates };
    return this.students[index];
  }

  static async getDonationsByStudent(studentId: string): Promise<Donation[]> {
    return this.donations.filter(d => d.studentId === studentId);
  }

  static async addDonation(donation: Omit<Donation, 'id' | 'createdAt'>): Promise<Donation> {
    const newDonation: Donation = {
      ...donation,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    this.donations.push(newDonation);
    
    // Update raised amount for student
    const student = this.students.find(s => s.id === donation.studentId);
    if (student) {
      student.raisedAmount += donation.amount;
    }
    
    return newDonation;
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    return this.users.find(u => u.email === email) || null;
  }

  static async addUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    this.users.push(newUser);
    return newUser;
  }
}