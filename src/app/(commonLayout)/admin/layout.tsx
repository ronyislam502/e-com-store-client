import Sidebar from "@/src/components/sidebar/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
      <div className="col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-3">{children}</div>
    </div>
  );
};

export default layout;
