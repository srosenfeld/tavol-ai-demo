/** Resolve public/ assets against Vite `base` (GitHub Pages-safe). */
export function asset(path: string): string {
  const clean = path.replace(/^\//, '');
  return `${import.meta.env.BASE_URL}${clean}`;
}
