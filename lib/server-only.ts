if (typeof window !== 'undefined') {
  throw new TypeError('Server-only code ran in the browser');
}

export {};
