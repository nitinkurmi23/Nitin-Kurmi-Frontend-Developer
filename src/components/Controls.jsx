export default function Controls({
  onSave,
  onLoad,
  onExport,
  onResetSections,
}) {
  const base =
    "px-5 py-2 rounded-xl font-semibold text-white transition transform hover:scale-105 shadow-md backdrop-blur-md";

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <button
        onClick={onSave}
        className={`${base} bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400`}
      >
        Save
      </button>
      <button
        onClick={onLoad}
        className={`${base} bg-green-500/20 hover:bg-green-500/30 border border-green-400`}
      >
        Load
      </button>
      <button
        onClick={onExport}
        className={`${base} bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400`}
      >
        Export JSON
      </button>
      <button
        onClick={onResetSections}
        className={`${base} bg-red-500/20 hover:bg-red-500/30 border border-red-400`}
      >
        Reset Sections
      </button>
    </div>
  );
}
