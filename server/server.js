import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import {
  getAllApplications,
  addApplication,
  updateApplicationStatus,
} from "./applicationsStore.js";
import { createSession, isValidSession, destroySession } from "./sessionStore.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env fayli loyiha ildizida joylashgan
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 3001;
const ADMIN_CODE = process.env.ADMIN_CODE;

if (!ADMIN_CODE) {
  console.warn(
    "\n[OGOHLANTIRISH] .env faylida ADMIN_CODE topilmadi. /arizalar sahifasiga hech kim kira olmaydi.\n" +
      "Loyiha ildizida .env fayl yarating va ADMIN_CODE=... qatorini qo'shing.\n"
  );
}

app.use(cors());
app.use(express.json());

/* ============================================================
   YORDAMCHI: admin sessiyasini tekshiruvchi middleware
   ============================================================ */
function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!isValidSession(token)) {
    return res.status(401).json({ error: "Sessiya tugagan yoki ruxsat yo'q. Qaytadan kiring." });
  }
  next();
}

/* ============================================================
   VALIDATSIYA (server tomonida ham — ikkinchi himoya qatlami)
   ============================================================ */
const UZ_PHONE_RE = /^\+998\d{9}$/;

function validateApplicationPayload(body) {
  const errors = {};
  const fullName = (body.fullName || "").trim();
  const phone = (body.phone || "").replace(/\s+/g, "");
  const age = Number(body.age);

  if (fullName.length < 2) errors.fullName = "Ism va familiyangizni kiriting";
  if (!UZ_PHONE_RE.test(phone)) errors.phone = "Telefon raqamingizni to'g'ri kiriting";
  if (!body.age || Number.isNaN(age) || age < 5 || age > 90) errors.age = "Yoshingizni to'g'ri kiriting";
  if (!body.course) errors.course = "Kursni tanlang";
  if (!body.level) errors.level = "Darajani tanlang";
  if (!body.branch) errors.branch = "Filialni tanlang";
  if (!body.preferredTime) errors.preferredTime = "Qulay vaqtni tanlang";

  return { valid: Object.keys(errors).length === 0, errors, normalizedPhone: phone, age };
}

/* ============================================================
   PUBLIC API — ariza yuborish
   ============================================================ */
app.post("/api/applications", async (req, res) => {
  const { valid, errors, normalizedPhone, age } = validateApplicationPayload(req.body);
  if (!valid) {
    return res.status(400).json({ error: "Forma to'liq yoki to'g'ri to'ldirilmagan.", fieldErrors: errors });
  }

  try {
    const created = await addApplication({
      fullName: req.body.fullName.trim(),
      phone: normalizedPhone,
      age,
      course: req.body.course,
      level: req.body.level,
      branch: req.body.branch,
      preferredTime: req.body.preferredTime,
      message: (req.body.message || "").trim(),
    });
    return res.status(201).json({ application: created });
  } catch (err) {
    console.error("Ariza saqlashda xatolik:", err);
    return res.status(500).json({ error: "Arizani saqlashda xatolik yuz berdi." });
  }
});

/* ============================================================
   ADMIN AUTH
   ============================================================ */
app.post("/api/admin/login", (req, res) => {
  const { code } = req.body || {};
  if (!ADMIN_CODE || !code || code !== ADMIN_CODE) {
    return res.status(401).json({ error: "Maxsus kod noto'g'ri." });
  }
  const token = createSession();
  return res.json({ token });
});

app.post("/api/admin/logout", requireAdmin, (req, res) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.slice(7);
  destroySession(token);
  return res.json({ ok: true });
});

/* ============================================================
   PROTECTED API — arizalarni ko'rish va statusini o'zgartirish
   ============================================================ */
app.get("/api/applications", requireAdmin, (req, res) => {
  try {
    const applications = getAllApplications();
    return res.json({ applications });
  } catch (err) {
    console.error("Arizalarni o'qishda xatolik:", err);
    return res.status(500).json({ error: "Arizalarni yuklashda xatolik yuz berdi." });
  }
});

app.patch("/api/applications/:id", requireAdmin, async (req, res) => {
  try {
    const updated = await updateApplicationStatus(req.params.id, req.body.status);
    return res.json({ application: updated });
  } catch (err) {
    const status = err.statusCode || 500;
    return res.status(status).json({ error: err.message || "Statusni yangilashda xatolik yuz berdi." });
  }
});

/* ============================================================
   PRODUCTION: build qilingan frontendni xizmat qilish
   `npm run build` bajarilgan bo'lsa, `dist/` papkasini shu server orqali
   bitta portda ulashish mumkin (proxy shart emas).
   ============================================================ */
const distPath = path.resolve(__dirname, "../dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`\n✔ Backend ishga tushdi: http://localhost:${PORT}\n`);
});
