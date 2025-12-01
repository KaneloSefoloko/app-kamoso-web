import DOMPurify from 'dompurify';

export default function SafeHTML({ html }) {
    // Sanitize any HTML before injecting
    const clean = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
    return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
