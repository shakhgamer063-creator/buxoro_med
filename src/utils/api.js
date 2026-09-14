const BASE = "/api";

async function parseJsonSafe(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

/** Ariza yuborish — public, token kerak emas */
export async function submitApplication(payload) {
  const res = await fetch(`${BASE}/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await parseJsonSafe(res);
  if (!res.ok) {
    const err = new Error(data?.error || "Xatolik yuz berdi.");
    err.fieldErrors = data?.fieldErrors || null;
    err.status = res.status;
    throw err;
  }
  return data.application;
}

/** Admin kodi bilan kirish */
export async function adminLogin(code) {
  const res = await fetch(`${BASE}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });
  const data = await parseJsonSafe(res);
  if (!res.ok) throw new Error(data?.error || "Kirishda xatolik yuz berdi.");
  return data.token;
}

export async function adminLogout(token) {
  await fetch(`${BASE}/admin/logout`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  }).catch(() => {});
}

export async function fetchApplications(token) {
  const res = await fetch(`${BASE}/applications`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await parseJsonSafe(res);
  if (!res.ok) {
    const err = new Error(data?.error || "Arizalarni yuklab bo'lmadi.");
    err.status = res.status;
    throw err;
  }
  return data.applications;
}

export async function updateApplicationStatus(token, id, status) {
  const res = await fetch(`${BASE}/applications/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  const data = await parseJsonSafe(res);
  if (!res.ok) {
    const err = new Error(data?.error || "Statusni yangilab bo'lmadi.");
    err.status = res.status;
    throw err;
  }
  return data.application;
}
