import Footer from "@/src/components/footer";
import { Navbar } from "@/src/components/navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col">
      <Navbar />
      <main className="h-[67vh]">{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
