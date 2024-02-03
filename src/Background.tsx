import React, { useEffect, useState } from "react";
import bgImage from "./assets/Rectangle 2.png";
import bananaImage from "./assets/image 11.png";
import booksImage from "./assets/image 13.png";
import shoeImage from "./assets/image 16.png";
import cycleImage from "./assets/image 12.png";
import ballImage from "./assets/image 15.png";
// import './styles.css'

function Background({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[100vw] overflow-hidden flex justify-center select-none">
      <div className="relative">
        <BgImageAndObjects position="left" />
        <BgImageAndObjects position="center">
          <div className="absolute w-full h-full top-0">{children}</div>
        </BgImageAndObjects>
        <BgImageAndObjects position="right" />
      </div>
    </div>
  );
}

function BgImageAndObjects({
  children,
  position,
}: {
  children?: React.ReactNode;
  position: "left" | "right" | "center";
}) {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Function to update screen size
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Attach event listener for window resize
    window.addEventListener('resize', updateScreenSize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);
  return (
    <div
      className={`${
        position == "left"
          ? "absolute left-[-108%] top-0"
          : position == "right"
          ? "absolute right-[-108%] top-0"
          : ""
      }`}
    >
      <img
        draggable={false}
        src={bgImage}
        className={`rounded-[40px] z-[-2] h-[90vh] sm:max-w-[85vw] max-w-[95vw] sm:w-[75vw] object-cover`}
      />
      {screenSize.width > 640 ? (
        <div>

          <img
            draggable={false}
            src={booksImage}
            className="absolute left-0 top-0"
          />
          <img
            draggable={false}
            src={shoeImage}
            className="absolute top-[50%] translate-y-[-50%] left-20 w-40"
          />
          <img
            draggable={false}
            src={bananaImage}
            className="absolute bottom-10 left-10"
          />
          <img
            draggable={false}
            src={ballImage}
            className="absolute top-10 right-10"
          />
          <img
            draggable={false}
            src={cycleImage}
            className="absolute bottom-0 right-10"
          />
        </div>
      ) : (
        <></>
      )}
      {position == "center" ? children : null}
    </div>
  );
}
export default Background;
