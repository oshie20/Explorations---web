import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { ExpenseOverview } from "@/pages/ExpenseOverview";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f5f8]">
      {/* Mobile overlay when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          aria-hidden
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 min-w-0 min-h-0" style={{ background: "#F9FBFC" }}>
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <ExpenseOverview />
      </div>
    </div>
  );
}

export default App;
