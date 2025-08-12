// src/utils/pkce.js
function base64urlEncode(str) {
  return btoa(String.fromCharCode(...new Uint8Array(str)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function generatePKCE() {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  const code_verifier = base64urlEncode(array);
  return crypto.subtle.digest('SHA-256', new TextEncoder().encode(code_verifier))
    .then((digest) => ({
      code_verifier,
      code_challenge: base64urlEncode(digest)
    }));
}