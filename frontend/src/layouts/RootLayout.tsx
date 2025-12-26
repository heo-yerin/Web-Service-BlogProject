import Header from "../components/Header";
import { Outlet } from "react-router";
import Footer from "../components/Footer";

export default function RootLayout() {
  return (
    <div className="page">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
