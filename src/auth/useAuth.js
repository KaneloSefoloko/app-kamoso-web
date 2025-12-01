
import { useEffect, useState } from 'react';

export function useAuth() {
    const [token, setToken] = useState(null);

    async function refresh() {
        const res = await fetch('/api/auth/refresh', { credentials: 'include' });
        if (res.ok) {
            const { accessToken } = await res.json();
            setToken(accessToken);
        } else {
            setToken(null);
        }
    }

    useEffect(() => {
        refresh();
    }, []);

    return { token, refresh };
}