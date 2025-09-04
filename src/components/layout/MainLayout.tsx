import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar";
import { Notification } from "../ui/Notification";
import { Footer } from "./Footer";

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Notification />
      <Footer />
    </div>
  );
};
