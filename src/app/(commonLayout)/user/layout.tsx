import Sidebar from "@/src/components/sidebar/Sidebar";

const userLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-2">
      <div className="col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-4">{children}</div>
    </div>
  );
};

export default userLayout;
