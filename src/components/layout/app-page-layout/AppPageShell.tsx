import AppHeader, { type BreadcrumbItem } from "./AppHeader";

interface AppPageShellProps {
  breadcrumbs?: BreadcrumbItem[];
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

function AppPageShell({
  breadcrumbs,
  title,
  description,
  actions,
  children,
}: AppPageShellProps) {
  return (
    <div className="flex flex-col h-full w-full bg-sidebar">
      <AppHeader
        breadcrumbs={breadcrumbs}
        title={title}
        description={description}
        actions={actions}
      />
      <div className="flex-1 min-h-0 px-4 md:px-8 py-6 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

export default AppPageShell;
