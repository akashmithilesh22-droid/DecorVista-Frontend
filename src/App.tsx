import { useState } from "react";
import { useSession } from "./context/SessionContext";
import Auth from "./pages/Auth";

import { Navbar } from "./components/Navbar";
import { HomePage } from "./components/HomePage";
import { AboutUs } from "./components/AboutUs";
import { ContactUs } from "./components/ContactUs";
import { CustomizationTool } from "./components/CustomizationTool";

type Page = "home" | "about" | "contact" | "tool";

export default function App() {
  const { user } = useSession();
  const [currentPage, setCurrentPage] = useState<Page>("home");

  // 🔒 AUTH GATE
  if (!user) {
    return <Auth />;
  }

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <main>
        {currentPage === "home" && (
          <HomePage onGetStarted={() => handleNavigate("tool")} />
        )}
        {currentPage === "about" && <AboutUs />}
        {currentPage === "contact" && <ContactUs />}
        {currentPage === "tool" && (
          <CustomizationTool onBack={() => handleNavigate("home")} />
        )}
      </main>
    </div>
  );
}
