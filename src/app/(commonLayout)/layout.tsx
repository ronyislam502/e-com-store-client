import { Navbar } from "@/src/components/navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default layout;
