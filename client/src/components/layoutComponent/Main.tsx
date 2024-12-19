import Header from "components/Header";
import { useState } from "react";
import Sidebar from "../Sidebar";

function Main({ children, history, info }: any) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <section>{children}</section>
      </div>
    </div>
  );
}

export default Main;
