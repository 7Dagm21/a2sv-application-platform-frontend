import { SiteHeader } from "@/src/app/components/admin-components/site-header";
import { SiteFooter } from "@/src/app/components/admin-components/site-footer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-90 text-white">
      <SiteHeader />
      <main className="flex-1 p-4 md:p-6 lg:p-10">{children}</main>
      <SiteFooter />
    </div>
  );
}
