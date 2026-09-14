import crypto from "crypto";

// Oddiy xotiradagi (in-memory) sessiya do'koni.
// Demo/lokal loyiha uchun yetarli — server qayta ishga tushsa sessiyalar tozalanadi.
const sessions = new Map(); // token -> { createdAt }
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 soat

export function createSession() {
  const token = crypto.randomBytes(24).toString("hex");
  sessions.set(token, { createdAt: Date.now() });
  return token;
}

export function isValidSession(token) {
  if (!token) return false;
  const session = sessions.get(token);
  if (!session) return false;
  if (Date.now() - session.createdAt > SESSION_TTL_MS) {
    sessions.delete(token);
    return false;
  }
  return true;
}

export function destroySession(token) {
  sessions.delete(token);
}
