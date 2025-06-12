import { useState, useRef } from "react";
import PageTree from "./components/PageTree";
import Controls from "./components/Controls";
import "./index.css";

function App() {
  const pageTreeRef = useRef();
  const defaultSections = ["Hero", "Features", "Testimonials", "CTA", "Footer"];
  const [homeSections, setHomeSections] = useState(defaultSections);

  const handleSave = () => {
    const { nodes, edges } = pageTreeRef.current.getGraphData();
    const saveData = { homeSections, nodes, edges };
    localStorage.setItem("pageStructure", JSON.stringify(saveData));
    alert("Saved!");
  };

  const handleLoad = () => {
    const saved = localStorage.getItem("pageStructure");
    if (saved) {
      const { homeSections, nodes, edges } = JSON.parse(saved);
      setHomeSections(homeSections);
      setNodes(nodes);
      setEdges(edges);
    }
  };

  const handleExport = () => {
    const { edges } = pageTreeRef.current.getGraphData();

    const pages = {};

    edges.forEach(({ source, target }) => {
      if (!pages[source]) {
        pages[source] = [];
      }
      pages[source].push(target);
    });

    const exportData = {
      homeSections,
      pages,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Page-Hierarchy-Structure.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleResetSections = () => {
    const updatedStructure =
      JSON.parse(localStorage.getItem("pageStructure")) || {};
    setHomeSections(defaultSections);
    const newStructure = {
      ...updatedStructure,
      homeSections: defaultSections,
    };
    localStorage.setItem("pageStructure", JSON.stringify(newStructure));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1e1e] via-[#2c2c2c] to-[#1a1a1a] p-4 text-white font-sans">
      <h1 className="text-4xl font-extrabold mb-5 text-center text-white drop-shadow-lg tracking-wide">
        Visual Page Hierarchy Editor
      </h1>

      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-md shadow-xl transition-all duration-300 hover:shadow-2xl  mx-auto">
        <PageTree
          ref={pageTreeRef}
          homeSections={homeSections}
          setHomeSections={setHomeSections}
        />
      </div>

      <div className="mt-5 flex justify-center">
        <Controls
          onSave={handleSave}
          onLoad={handleLoad}
          onExport={handleExport}
          onResetSections={handleResetSections}
        />
      </div>
    </div>
  );
}

export default App;
