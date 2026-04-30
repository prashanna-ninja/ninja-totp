import AppSideBar from "@/components/layout/AppSideBar";
import { SidebarProvider } from "@/components/layout/SidebarContext";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSideBar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}

export default layout;
