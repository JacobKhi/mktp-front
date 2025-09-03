import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar";
import { Notification } from "../ui/Notification";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Notification />
    </div>
  );
};
