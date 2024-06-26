import { Resume } from "./Resume.js";
import { Header } from "./Header.js";
import { useEffect, useState } from "react";
import { handleGenerateResume } from "../utils/generateResume.js";
import "../App.css";

export default function Home() {
  const [showMenu, setShowMenu] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [areaCv, setAreaCv] = useState(document.getElementById("area-cv"));

  useEffect(() => {
    setAreaCv(document.getElementById("area-cv"));

    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDarkTheme = () => {
    setDarkTheme(!darkTheme);

    if (darkTheme) {
      document.body.classList.remove("dark-theme");
    } else {
      document.body.classList.add("dark-theme");
    }
  };

  return (
    <>
      <Header showMenu={showMenu} setShowMenu={() => setShowMenu(!showMenu)} />

      <main className="l-main bd-container">
        <div className="resume" id="area-cv">
          <Resume
            darkTheme={darkTheme}
            handleDarkTheme={handleDarkTheme}
            generateResume={() => handleGenerateResume(areaCv)}
          />
        </div>
      </main>

      <a
        href="#"
        className={showScrollTop ? "scrolltop show-scroll" : "scrolltop"}
        id="scroll-top"
        onClick={goToTop}
      >
        <i className="bx bx-up-arrow scrolltop__icon"></i>
      </a>
    </>
  );
}
