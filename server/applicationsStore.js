import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.resolve(__dirname, "../data/applications.json");

// Bir vaqtda bir nechta yozish operatsiyasi bir-birini bosib
// yubormasligi uchun oddiy navbat (queue) — kichik lokal loyiha uchun kifoya.
let writeQueue = Promise.resolve();

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ applications: [] }, null, 2), "utf-8");
  }
}

function readRaw() {
  ensureDataFile();
  try {
    const content = fs.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(content);
    if (!Array.isArray(parsed.applications)) return { applications: [] };
    return parsed;
  } catch {
    // Fayl buzilgan yoki bo'sh bo'lsa — xavfsiz boshlang'ich holatga qaytamiz,
    // lekin faylni ustidan yozib yubormaymiz (mavjud ma'lumot yo'qolmasin).
    return { applications: [] };
  }
}

function writeRaw(data) {
  writeQueue = writeQueue.then(
    () =>
      new Promise((resolve, reject) => {
        fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8", (err) => {
          if (err) reject(err);
          else resolve();
        });
      })
  );
  return writeQueue;
}

export function getAllApplications() {
  const { applications } = readRaw();
  // Eng yangisi tepada
  return [...applications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function addApplication(payload) {
  const data = readRaw();
  const newApplication = {
    id: crypto.randomUUID(),
    fullName: payload.fullName,
    phone: payload.phone,
    age: payload.age,
    course: payload.course,
    level: payload.level,
    branch: payload.branch,
    preferredTime: payload.preferredTime,
    message: payload.message || "",
    status: "new",
    createdAt: new Date().toISOString(),
  };
  data.applications.push(newApplication);
  await writeRaw(data);
  return newApplication;
}

const VALID_STATUSES = ["new", "contacted", "accepted", "cancelled"];

export async function updateApplicationStatus(id, status) {
  if (!VALID_STATUSES.includes(status)) {
    const err = new Error("Noto'g'ri status qiymati.");
    err.statusCode = 400;
    throw err;
  }
  const data = readRaw();
  const idx = data.applications.findIndex((a) => a.id === id);
  if (idx === -1) {
    const err = new Error("Ariza topilmadi.");
    err.statusCode = 404;
    throw err;
  }
  data.applications[idx].status = status;
  await writeRaw(data);
  return data.applications[idx];
}

export { VALID_STATUSES };
