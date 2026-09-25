import DOMPurify from 'dompurify';

/**
 * DOM Sanitizer to defend against XSS vulnerabilities in user-uploaded documents and AI markdown outputs.
 * Parameter: Security Compliance
 */
export function sanitizeHTML(dirtyHtml: string): string {
  if (!dirtyHtml) return '';
  
  // Use DOMPurify if available in DOM environment
  if (typeof window !== 'undefined' && DOMPurify.sanitize) {
    return DOMPurify.sanitize(dirtyHtml, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'span', 'ul', 'ol', 'li', 'code', 'pre', 'br', 'mark'],
      ALLOWED_ATTR: ['href', 'target', 'class', 'rel', 'id', 'aria-label', 'role', 'tabindex', 'data-clause-id']
    });
  }

  // Pure string fallback escaping for SSR / node environments
  return dirtyHtml
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Escapes plain text for direct safe DOM injection.
 */
export function escapeText(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
