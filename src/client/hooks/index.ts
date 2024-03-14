export function useSearchParams() {
  const searchParams = new URLSearchParams(window.location.search);

  return searchParams;
}
