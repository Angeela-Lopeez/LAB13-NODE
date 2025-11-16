import bcrypt from "bcryptjs";

let users: any[] = [];

let attempts: Record<string, { count: number; lastAttempt: number }> = {};

export function findUserByEmail(email: string) {
  return users.find((u) => u.email === email);
}

export async function createUser(name: string, email: string, password: string) {
  const hashed = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password: hashed,
    image: null,
  };
  users.push(newUser);
  return newUser;
}

export async function verifyPassword(user: any, password: string) {
  return await bcrypt.compare(password, user.password);
}

export function recordFailedAttempt(email: string) {
  const now = Date.now();

  if (!attempts[email]) {
    attempts[email] = { count: 1, lastAttempt: now };
    return;
  }

  const diff = now - attempts[email].lastAttempt;

  if (diff > 5 * 60 * 1000) {
    attempts[email] = { count: 1, lastAttempt: now };
  } else {
    attempts[email].count++;
    attempts[email].lastAttempt = now;
  }
}

export function isBlocked(email: string) {
  const record = attempts[email];
  if (!record) return false;

  return record.count >= 5; 
}

export function resetAttempts(email: string) {
  delete attempts[email];
}
