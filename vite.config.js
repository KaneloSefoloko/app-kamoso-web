
// vite.config.js (dev)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        headers: {
            'Content-Security-Policy': [
                "default-src 'self'",
                "script-src 'self' 'unsafe-inline' https://apis.google.com",
                "object-src 'none'",
                "img-src 'self' data: blob: https://res.cloudinary.com https://firebasestorage.googleapis.com https://www.gstatic.com https://lh3.googleusercontent.com https://*.googleusercontent.com",
                "media-src 'self' https://res.cloudinary.com",
                "style-src 'self' 'unsafe-inline'",
                "font-src 'self' https://fonts.gstatic.com data:",
                "connect-src 'self' https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://www.googleapis.com https://apis.google.com",
                "frame-ancestors 'none'",
                "base-uri 'self'; form-action 'self';",
                "upgrade-insecure-requests"
            ].join('; ')
        }
    }
})