// shared/layouts/MainLayout.tsx
import { Nav } from "@/shared/components/Nav";
import { Footer } from "@/shared/components/Footer";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
