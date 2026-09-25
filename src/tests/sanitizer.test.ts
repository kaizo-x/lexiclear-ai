import { describe, it, expect } from 'vitest';
import { sanitizeHTML, escapeText } from '../utils/sanitizer';

describe('Security & XSS DOM Sanitizer Utility', () => {
  it('should strip malicious script tags from HTML input', () => {
    const dirty = '<p>Normal text</p><script>alert("xss")</script>';
    const clean = sanitizeHTML(dirty);
    expect(clean).not.toContain('<script>');
    expect(clean).not.toContain('alert');
  });

  it('should escape HTML special characters in plain text mode', () => {
    const raw = '100 > 50 & 5 < 10 "quote"';
    const escaped = escapeText(raw);
    expect(escaped).toBe('100 &gt; 50 &amp; 5 &lt; 10 &quot;quote&quot;');
  });
});
