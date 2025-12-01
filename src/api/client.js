// Core GET utility
export async function apiGet(url, options = {}) {
    const res = await fetch(url, {
        method: 'GET',
        credentials: 'include', // include cookies (session/CSRF)
        headers: {
            'Accept': 'application/json',
            ...(options.headers || {}),
        },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

// Core POST utility
export async function apiPost(url, body, options = {}) {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
        body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

// Secure POST with CSRF token in header
export async function postWithCsrf(url, body, csrfToken) {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken, // server should validate this
        },
        body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

// Optional: PUT/DELETE
export async function apiPut(url, body, options = {}) {
    const res = await fetch(url, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
        body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

export async function apiDelete(url, options = {}) {
    const res = await fetch(url, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            ...(options.headers || {}),
        },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    try {
        return await res.json(); // some APIs return JSON on delete
    } catch {
        return null;
    }
}