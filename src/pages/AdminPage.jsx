import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Clock, Loader2, Lock,
  LogOut, MapPin, Phone, RefreshCw, Search, ShieldAlert, Stethoscope, XCircle,
} from "lucide-react";
import { adminLogin, adminLogout, fetchApplications, updateApplicationStatus } from "../utils/api.js";

const TOKEN_KEY = "bilimdon_admin_token";

const STATUS_META = {
  new: { label: "Yangi", dot: "🟡", badge: "bg-amber-50 text-amber-700 border-amber-200" },
  contacted: { label: "Bog'lanildi", dot: "🔵", badge: "bg-blue-50 text-blue-700 border-blue-200" },
  accepted: { label: "Qabul qilindi", dot: "🟢", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  cancelled: { label: "Bekor qilindi", dot: "🔴", badge: "bg-red-50 text-red-700 border-red-200" },
};

const STATUS_ORDER = ["new", "contacted", "accepted", "cancelled"];

const FILTERS = [
  { id: "all", label: "Barchasi" },
  { id: "new", label: "Yangi" },
  { id: "contacted", label: "Bog'lanildi" },
  { id: "accepted", label: "Qabul qilindi" },
  { id: "cancelled", label: "Bekor qilindi" },
];

function formatDate(iso) {
  try {
    return new Intl.DateTimeFormat("uz-UZ", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

/* ============================================================
   1) MAXSUS KOD KIRITISH EKRANI
   ============================================================ */
function CodeGate({ onAuthed }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);
    try {
      const token = await adminLogin(code);
      sessionStorage.setItem(TOKEN_KEY, token);
      onAuthed(token);
    } catch (err) {
      setError(err.message || "Maxsus kod noto'g'ri.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-950 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-violet-600/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl" />

      <form onSubmit={submit} className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto">
          <Lock className="w-6 h-6 text-indigo-600" />
        </div>
        <h1 className="text-xl font-semibold text-indigo-950 text-center mt-4">Maxsus kodni kiriting</h1>
        <p className="text-sm text-slate-500 text-center mt-1.5">Arizalar paneliga faqat maxsus kod bilan kirish mumkin.</p>

        <input
          type="password"
          autoFocus
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="••••••••"
          className={`mt-6 w-full rounded-xl border px-4 py-3 text-sm text-center tracking-widest bg-white transition-all duration-200 focus:outline-none focus:ring-2 ${
            error ? "border-red-300 focus:ring-red-100 focus:border-red-400" : "border-slate-200 focus:ring-indigo-200 focus:border-indigo-400"
          }`}
        />
        {error && (
          <p className="flex items-center justify-center gap-1.5 text-xs text-red-500 mt-2">
            <ShieldAlert className="w-3.5 h-3.5" /> {error}
          </p>
        )}

        <button
          disabled={loading || !code}
          className="mt-5 w-full rounded-full bg-indigo-950 text-white font-semibold py-3 flex items-center justify-center gap-2 hover:bg-indigo-900 active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {loading ? "Tekshirilmoqda..." : "Kirish"}
        </button>
      </form>
    </div>
  );
}

/* ============================================================
   2) STATISTIKA KARTALARI
   ============================================================ */
function StatBlock({ label, value, className = "" }) {
  return (
    <div className={`rounded-2xl border border-slate-100 bg-white p-5 ${className}`}>
      <div className="text-2xl sm:text-3xl font-semibold text-indigo-950 tabular-nums">{value}</div>
      <div className="text-sm text-slate-500 mt-1">{label}</div>
    </div>
  );
}

/* ============================================================
   3) STATUS SELEKTOR (har bir ariza qatorida)
   ============================================================ */
function StatusSelect({ status, onChange, disabled }) {
  const meta = STATUS_META[status] || STATUS_META.new;
  return (
    <select
      value={status}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className={`text-xs font-medium rounded-full border px-3 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-60 ${meta.badge}`}
    >
      {STATUS_ORDER.map((s) => (
        <option key={s} value={s}>
          {STATUS_META[s].dot} {STATUS_META[s].label}
        </option>
      ))}
    </select>
  );
}

/* ============================================================
   4) ARIZALAR DASHBOARD (kod tasdiqlangandan keyin)
   ============================================================ */
function Dashboard({ token, onLogout }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const apps = await fetchApplications(token);
      setApplications(apps);
    } catch (err) {
      if (err.status === 401) {
        onLogout(true);
        return;
      }
      setError(err.message || "Arizalarni yuklab bo'lmadi.");
    } finally {
      setLoading(false);
    }
  }, [token, onLogout]);

  useEffect(() => { load(); }, [load]);

  const stats = useMemo(() => {
    const total = applications.length;
    const byStatus = { new: 0, contacted: 0, accepted: 0, cancelled: 0 };
    applications.forEach((a) => { if (byStatus[a.status] !== undefined) byStatus[a.status] += 1; });
    return { total, ...byStatus };
  }, [applications]);

  const filtered = useMemo(() => {
    return applications.filter((a) => {
      const matchesFilter = filter === "all" || a.status === filter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q || a.fullName.toLowerCase().includes(q) || a.phone.replace(/\s+/g, "").includes(q.replace(/\s+/g, ""));
      return matchesFilter && matchesQuery;
    });
  }, [applications, filter, query]);

  const changeStatus = async (id, status) => {
    setUpdatingId(id);
    const prev = applications;
    setApplications((apps) => apps.map((a) => (a.id === id ? { ...a, status } : a)));
    try {
      await updateApplicationStatus(token, id, status);
    } catch (err) {
      setApplications(prev); // rollback
      if (err.status === 401) onLogout(true);
    } finally {
      setUpdatingId(null);
    }
  };

  const logout = async () => {
    await adminLogout(token);
    onLogout(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-indigo-950 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </span>
            <span className="font-semibold text-white">Buxoro Med Academy <span className="text-indigo-300 font-normal">/ Arizalar</span></span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={load}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              title="Yangilash"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Chiqish
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-10">
        {/* Statistika */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatBlock label="Jami arizalar" value={stats.total} />
          <StatBlock label="🟡 Yangi" value={stats.new} />
          <StatBlock label="🔵 Bog'lanildi" value={stats.contacted} />
          <StatBlock label="🟢 Qabul qilindi" value={stats.accepted} />
        </div>

        {/* Qidiruv va filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ism yoki telefon bo'yicha qidirish..."
              className="w-full rounded-full border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
            />
          </div>
          <div className="flex flex-row flex-nowrap gap-2 overflow-x-auto no-scrollbar sm:flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  filter === f.id ? "bg-indigo-950 text-white" : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 mb-6 flex items-center gap-2">
            <XCircle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-24 text-slate-400 gap-2">
            <Loader2 className="w-5 h-5 animate-spin" /> Yuklanmoqda...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-slate-400 text-sm">Hech qanday ariza topilmadi.</div>
        ) : (
          <>
            {/* Desktop: table */}
            <div className="hidden md:block rounded-2xl border border-slate-100 bg-white overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left text-slate-500 text-xs uppercase tracking-wide">
                    <th className="px-5 py-3 font-medium">Ism</th>
                    <th className="px-5 py-3 font-medium">Telefon</th>
                    <th className="px-5 py-3 font-medium">Yosh</th>
                    <th className="px-5 py-3 font-medium">Kurs / Daraja</th>
                    <th className="px-5 py-3 font-medium">Filial</th>
                    <th className="px-5 py-3 font-medium">Vaqt</th>
                    <th className="px-5 py-3 font-medium">Sana</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((a) => (
                    <tr key={a.id} className="border-t border-slate-100 hover:bg-slate-50/60 transition-colors align-top">
                      <td className="px-5 py-4 font-medium text-indigo-950">{a.fullName}</td>
                      <td className="px-5 py-4">
                        <a href={`tel:${a.phone}`} className="flex items-center gap-1.5 text-slate-600 hover:text-indigo-700">
                          <Phone className="w-3.5 h-3.5" /> {a.phone}
                        </a>
                      </td>
                      <td className="px-5 py-4 text-slate-600">{a.age}</td>
                      <td className="px-5 py-4 text-slate-600">
                        <div className="font-medium text-indigo-950">{a.course}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{a.level}</div>
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {a.branch}</span>
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-400" /> {a.preferredTime}</span>
                      </td>
                      <td className="px-5 py-4 text-slate-500 text-xs whitespace-nowrap">{formatDate(a.createdAt)}</td>
                      <td className="px-5 py-4">
                        <StatusSelect status={a.status} disabled={updatingId === a.id} onChange={(s) => changeStatus(a.id, s)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobil: cards */}
            <div className="md:hidden space-y-4">
              {filtered.map((a) => (
                <div key={a.id} className="rounded-2xl border border-slate-100 bg-white p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-indigo-950">{a.fullName}</div>
                      <a href={`tel:${a.phone}`} className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
                        <Phone className="w-3.5 h-3.5" /> {a.phone}
                      </a>
                    </div>
                    <StatusSelect status={a.status} disabled={updatingId === a.id} onChange={(s) => changeStatus(a.id, s)} />
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                    <div><div className="text-xs text-slate-400">Yosh</div><div className="text-slate-700">{a.age}</div></div>
                    <div><div className="text-xs text-slate-400">Daraja</div><div className="text-slate-700">{a.level}</div></div>
                    <div className="col-span-2"><div className="text-xs text-slate-400">Kurs</div><div className="text-slate-700 font-medium">{a.course}</div></div>
                    <div><div className="text-xs text-slate-400">Filial</div><div className="text-slate-700">{a.branch}</div></div>
                    <div><div className="text-xs text-slate-400">Qulay vaqt</div><div className="text-slate-700">{a.preferredTime}</div></div>
                  </div>

                  {a.message && (
                    <div className="mt-3 pt-3 border-t border-slate-100 text-sm text-slate-600">
                      <div className="text-xs text-slate-400 mb-1">Izoh</div>
                      {a.message}
                    </div>
                  )}

                  <div className="mt-3 text-xs text-slate-400">{formatDate(a.createdAt)}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

/* ============================================================
   ASOSIY: kod tekshiruvi -> Dashboard
   ============================================================ */
export default function AdminPage() {
  const [token, setToken] = useState(undefined); // undefined = hali tekshirilmagan
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem(TOKEN_KEY);
    if (!saved) {
      setToken(null);
      setChecking(false);
      return;
    }
    // Saqlangan token hali kuchlimi — tekshirib olamiz
    fetchApplications(saved)
      .then(() => setToken(saved))
      .catch(() => {
        sessionStorage.removeItem(TOKEN_KEY);
        setToken(null);
      })
      .finally(() => setChecking(false));
  }, []);

  const handleLogout = (expired) => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
    if (expired) {
      // sessiya muddati tugagan bo'lishi mumkin — foydalanuvchiga bildiramiz
      setTimeout(() => alert("Sessiya muddati tugadi. Iltimos, qaytadan kiring."), 0);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-indigo-950 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-white animate-spin" />
      </div>
    );
  }

  if (!token) {
    return <CodeGate onAuthed={(t) => setToken(t)} />;
  }

  return <Dashboard token={token} onLogout={handleLogout} />;
}
