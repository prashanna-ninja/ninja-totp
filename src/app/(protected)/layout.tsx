import AppSideBar from "@/components/layout/AppSideBar";
import { SidebarProvider } from "@/components/layout/SidebarContext";
import { redirectIfUnauthenticated } from "@/lib/auth-guard";

async function layout({ children }: { children: React.ReactNode }) {
  await redirectIfUnauthenticated();

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSideBar />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </SidebarProvider>
  );
}

export default layout;
