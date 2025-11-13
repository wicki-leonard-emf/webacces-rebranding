// @ts-nocheck
export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <div
        className="h-14 w-14 rounded-full border-4 border-[#e5e7eb] border-t-[#111] animate-spin motion-reduce:animate-none"
        role="status"
        aria-label="Chargement"
      />
      <span className="sr-only">Chargement…</span>
    </div>
  );
}
