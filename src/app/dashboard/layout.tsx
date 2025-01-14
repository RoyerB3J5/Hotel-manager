import Nav from "@/components/Nav";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <section className="w-full h-screen flex flex-col justify-start items-center gap-6 py-12 px-20 transition-all overflow-y-scroll">
        {children}
      </section>
    </>
  );
}
