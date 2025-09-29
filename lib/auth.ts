// Authentication utilities
import { Database } from './database';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'donor' | 'admin';
}

export class AuthService {
  private static currentUser: AuthUser | null = null;

  static async signIn(email: string, password: string): Promise<AuthUser | null> {
    // In a real app, you'd verify password hash
    const user = await Database.getUserByEmail(email);
    if (user) {
      this.currentUser = user;
      return user;
    }
    return null;
  }

  static async signUp(email: string, password: string, name: string, role: 'student' | 'donor' = 'donor'): Promise<AuthUser> {
    const existingUser = await Database.getUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser = await Database.addUser({
      email,
      name,
      role
    });

    this.currentUser = newUser;
    return newUser;
  }

  static getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  static signOut(): void {
    this.currentUser = null;
  }

  static isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  static hasRole(role: string): boolean {
    return this.currentUser?.role === role;
  }
}