import React from "react";
import { MenubarDemo } from "@/components/menu-bar";
import { DrawerDemo } from "@/components/drawer";

function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Top Menubar */}
      <div className="mt-4">
        
      <MenubarDemo />
      </div>

      {/* Content Area */}
      <div className="flex  items-center justify-center h-screen">
        <DrawerDemo/>
      </div>
    </div>
  );
}

export default DashboardPage;
