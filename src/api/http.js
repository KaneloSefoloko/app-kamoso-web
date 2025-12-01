let accessToken = null; // keep in memory for security

export function setAccessToken(token) {
    accessToken = token;
}

export async function refreshToken() {
    try {
        const res = await fetch('/api/auth/refresh', {
            method: 'POST',
            credentials: 'include', // send refresh cookie
        });
        if (!res.ok) throw new Error('Refresh failed');
        const data = await res.json();
        accessToken = data.accessToken;
        return accessToken;
    } catch (err) {
        console.error('Token refresh error:', err);
        accessToken = null;
        throw err;
    }
}

async function httpFetch(url, options = {}, retries = 2, timeout = 8000) {
    if (!navigator.onLine) throw new Error('Offline: Cannot reach server');

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const res = await fetch(url, {
            ...options,
            credentials: 'include',
            signal: controller.signal,
            headers: {
                ...(options.headers || {}),
                ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            },
        });
        clearTimeout(id);

        if (res.status === 401 && retries > 0) {
            // Try refresh
            await refreshToken();
            return httpFetch(url, options, retries - 1, timeout);
        }

        if (!res.ok) {
            if (retries > 0 && res.status >= 500) {
                return httpFetch(url, options, retries - 1, timeout);
            }
            throw new Error(`HTTP ${res.status}`);
        }

        const contentType = res.headers.get('content-type') || '';
        return contentType.includes('application/json') ? res.json() : res.text();

    } catch (err) {
        clearTimeout(id);
        if (retries > 0 && (err.name === 'AbortError' || err.message.includes('Failed'))) {
            return httpFetch(url, options, retries - 1, timeout);
        }
        throw err;
    }
}

// Convenience wrappers
export function apiGet(url, headers = {}) {
    return httpFetch(url, { method: 'GET', headers });
}

export function apiPost(url, body, headers = {}) {
    return httpFetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(body),
    });
}

export function apiPut(url, body, headers = {}) {
    return httpFetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(body),
    });
}

export function apiDelete(url, headers = {}) {
    return httpFetch(url, { method: 'DELETE', headers });
}

export function postWithCsrf(url, body, csrfToken) {
    return apiPost(url, body, { 'X-CSRF-Token': csrfToken });
}
