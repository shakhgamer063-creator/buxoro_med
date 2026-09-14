# Buxoro Med Academy — O'quv markazi sayti

Premium ko'rinishdagi, to'liq responsive React + Vite + Tailwind sayti,
oddiy lokal Node/Express backend va JSON fayl asosidagi ariza tizimi bilan.

## Texnologiyalar

- **Frontend:** React 18 + Vite 5 + Tailwind CSS 3 + lucide-react
- **Backend:** Node.js + Express (juda kichik, faqat bir nechta endpoint)
- **"Database":** oddiy JSON fayl — `data/applications.json` (tashqi baza yo'q)

## Loyihani ishga tushirish

```bash
npm install
npm run dev
```

Bitta shu buyruq **frontend (Vite, :5173) va backend (Express, :3001) ni bir vaqtda**
ishga tushiradi (`concurrently` yordamida). Brauzerda `http://localhost:5173` ni oching.

Faqat backendni alohida ishga tushirish kerak bo'lsa: `npm run dev:server`.

### ADMIN_CODE qayerga yoziladi?

Loyiha ildizida `.env` fayli bor (u `.gitignore`da, GitHub'ga tushmaydi):

```env
PORT=3001
ADMIN_CODE=BILIMDON-2026
```

`ADMIN_CODE` qiymatini o'zingiznikiga o'zgartiring — bu `/arizalar` sahifasiga
kirish uchun ishlatiladigan yagona maxsus kod. Namuna sifatida `.env.example`
fayli ham bor.

## Production build

```bash
npm run build
npm start
```

`npm run build` — `dist/` papkasida optimallashtirilgan frontend yaratadi.
`npm start` esa Express serverni ishga tushiradi; server `dist/` mavjud bo'lsa
uni **o'zi** bitta portda (3001) xizmat qiladi — alohida frontend hostingi shart emas.

## Loyiha strukturasi

```
data/
  applications.json     — barcha arizalar shu yerda saqlanadi (JSON fayl, tashqi baza emas)

server/
  server.js             — Express API: POST/GET /api/applications, PATCH /api/applications/:id,
                           POST /api/admin/login, POST /api/admin/logout
  applicationsStore.js  — JSON faylni o'qish/yozish logikasi (navbat bilan, xavfsiz)
  sessionStore.js        — admin uchun vaqtinchalik in-memory sessiya (token) do'koni

src/
  components/            — asosiy sayt komponentlari (Navbar, Hero, Courses, ...)
  pages/AdminPage.jsx     — yashirin /arizalar sahifasi: kod ekrani + dashboard
  data/                   — mock kontent (kurslar, ustozlar, filiallar va h.k.)
  utils/api.js            — backend bilan gaplashuvchi barcha fetch chaqiruvlari
  utils/scroll.js         — smooth-scroll yordamchisi
  hooks/useInView.js      — scroll-reveal va animated counter uchun IntersectionObserver hook
  App.jsx                 — asosiy sayt (o'zgarishsiz qoldi)
  main.jsx                — URL `/arizalar` bo'lsa AdminPage'ni, aks holda App'ni ko'rsatadi
```

## Ariza qanday ishlaydi

1. Foydalanuvchi saytdagi **"Qabulga yozilish"** formasini to'ldiradi.
2. Frontend barcha maydonlarni tekshiradi (ism ≥ 2 belgi, O'zbekiston telefon formati,
   yosh 5–90 oralig'ida, kurs/daraja/filial/vaqt albatta tanlangan bo'lishi kerak).
   Xato bo'lsa — mos maydon ostida o'zbekcha xabar chiqadi, so'rov umuman yuborilmaydi.
3. Hammasi to'g'ri bo'lsa, tugma "Yuborilmoqda..." holatiga o'tadi (qayta bosish
   bloklanadi — duplicate ariza yuborib bo'lmaydi) va `POST /api/applications` chaqiriladi.
4. Backend **yana bir marta** serverda validatsiya qiladi, so'ng `data/applications.json`
   fayliga yangi obyektni **qo'shadi** (mavjud arizalarni o'chirmasdan), `id` (UUID),
   `status: "new"` va `createdAt` avtomatik generatsiya qilinadi.
5. Muvaffaqiyatli bo'lsa — "Arizangiz muvaffaqiyatli yuborildi!" modali chiqadi va forma tozalanadi.
   Server xato qaytarsa — "Arizani yuborishda xatolik yuz berdi..." xabari ko'rsatiladi.

## Yashirin /arizalar sahifasi

- Navbar yoki boshqa hech qanday menyuda ko'rinmaydi — faqat URL orqali:
  `http://localhost:5173/arizalar`
- Kirishda **faqat bitta maxsus kod** so'raladi (username/parol yo'q).
- Kod `POST /api/admin/login` orqali serverda tekshiriladi; frontend bundle'ida
  `ADMIN_CODE` hech qachon saqlanmaydi.
- To'g'ri kod kiritilgach, server vaqtinchalik token (sessiya) qaytaradi;
  u brauzerning `sessionStorage`'ida saqlanadi (8 soatdan keyin yoki brauzer
  yopilganda avtomatik tugaydi) va har bir keyingi so'rovda
  `Authorization: Bearer <token>` sifatida yuboriladi.
- `GET /api/applications` va `PATCH /api/applications/:id` — faqat shu token
  to'g'ri bo'lsa ishlaydi (401 aks holda).
- Sahifada: statistikalar (jami / yangi / bog'lanildi / qabul qilindi), ism yoki
  telefon bo'yicha qidiruv, status bo'yicha filter, desktopda jadval, mobilda kartalar,
  har bir arizaning statusini joyida o'zgartirish, va **Chiqish** tugmasi.

## Animatsiyalar

- Scroll-reveal: `Reveal` komponenti — yengil, faqat CSS transition + IntersectionObserver.
- Animated counter: `Stats.jsx` ichidagi `Counter` komponenti.
- Hover effektlar: kartalar, tugmalar va havolalarda.
- Mobil menyu: max-height/opacity orqali silliq ochilish-yopilish.
- `prefers-reduced-motion` tanlovi hurmat qilinadi.

## Sayt kontenti bilan ishlash

Kurslar, ustozlar, filiallar, natijalar va FAQ — barchasi `src/data/*.js`
fayllarida mock tarzda saqlanadi. Kelajakda API/CMS ulash uchun shu fayllarni
`fetch` chaqiruviga almashtirish kifoya — komponentlarga tegish shart emas.
