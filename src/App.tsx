import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { ExpenseOverview } from "@/pages/ExpenseOverview";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f5f8]">
      <div className="hidden lg:flex h-full shrink-0">
        <Sidebar />
      </div>

      <div className="lg:hidden">
        <Drawer
          open={sidebarOpen}
          onOpenChange={setSidebarOpen}
          direction="left"
          shouldScaleBackground={false}
        >
          <DrawerContent className="bg-[#F9FBFC] border-[#EDEFF4] data-[vaul-drawer-direction=left]:w-[min(100vw,280px)]">
            <Sidebar embedded onClose={() => setSidebarOpen(false)} />
          </DrawerContent>
        </Drawer>
      </div>

      <div className="flex flex-col flex-1 min-w-0 min-h-0" style={{ background: "#F9FBFC" }}>
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <ExpenseOverview />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
