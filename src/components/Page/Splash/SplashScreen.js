import React, { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as RightArrow } from "../../../img/rightArrow.svg";
import BoldParagraph from "../../Canvas/Description/BoldParagraph";
import Navigation from "../partial/Navbar/Navigation";
import "./splash.css";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

const SplashScreen = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");

    if (document.getElementById("navbar")) {
      document.getElementById("navbar").style.backgroundColor = "#121824";
    }
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <Navigation themeToggle={false} />
      <div className="bg-homeGray relative flex h-screen justify-center min-w-screen overflow-hidden">
        <div className="main-canvas-grid z-0 dark:opacity-[0.03]" />

        <div className="w-full flex items-center max-w-[2000px]">
          <div className="flex z-30 flex-1 p-0 md:p-20">
            <div className="absolute top-0 flex flex-col w-full h-full px-[1em] items-center md:items-start pt-[6em] gap-[5em] z-20">
              <p className="font-lg text-white text-[6vh] z-10 font-semibold font-spline">
                Algo Visualizer
              </p>
              <span className="font-spline max-w-[47ch] text-[1.2em] z-10 text-gray-100">
                Improve your understanding of algorithms by watching simple
                and <BoldParagraph text="interactive animations" />.{" "}
                <br />
                Welcome to the algo visualizer.
              </span>

              <div className="flex flex-col gap-5">
                <div
                  className="hover:-translate-y-[.2em] transition duration-200 ease-in-out relative hover:shadow-custom-md-lightBlue cursor-pointer font-semibold  text-white font-spline bg-lightBlue2 p-[1em] text-[1em] rounded-md w-[15em]"
                  onClick={() => navigate("/sorting-visualizer/app")}
                >
                  Sorting Algorithms
                  <RightArrow className="absolute top-[50%] -translate-y-[50%] right-[1em]" />
                </div>

                {/* <div
                  className="hover:-translate-y-[.2em] transition duration-200 ease-in-out relative hover:shadow-custom-md-lightBlue cursor-pointer font-semibold  text-white font-spline bg-lightBlue2 p-[1em] text-[1em] rounded-md w-[15em]"
                  onClick={() => navigate("/dashboard-two")}
                >
                  Path Finding Algorithms
                  <RightArrow className="absolute top-[50%] -translate-y-[50%] right-[1em]" />
                </div> */}
              </div>
            </div>
          </div>

          <div className="hidden lg:block translate-x-[9em] xl:translate-x-[0] md:scale-[.7] z-20 -translate-y-[4em] lg:scale-[.7] xl:scale-[1]">
            <Suspense fallback={<></>}>
              <Spline scene="https://prod.spline.design/qblRNAa3C-eNH6Bo/scene.splinecode" />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default SplashScreen;
