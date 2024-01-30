import React, { useEffect, useState } from "react";
import bgImage from "./assets/Rectangle 2.png";
import image1 from "./assets/image 11.png";
import image2 from "./assets/image 13.png";
import image3 from "./assets/image 16.png";
import image4 from "./assets/image 12.png";
import image5 from "./assets/image 15.png";
// import './styles.css'

function Background({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[100vw] overflow-hidden flex justify-center">
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
        className={`rounded-[40px] z-[-2] h-[90vh] max-w-[85vw]
    ${position == "center" ? " object-cover" : ""}
    `}
      />
      {window.innerWidth > 768 ? (
        <div>

          <img
            draggable={false}
            src={image2}
            className="absolute left-0 top-0"
          />
          <img
            draggable={false}
            src={image3}
            className="absolute top-[50%] translate-y-[-50%] left-32"
          />
          <img
            draggable={false}
            src={image1}
            className="absolute bottom-10 left-10"
          />
          <img
            draggable={false}
            src={image5}
            className="absolute top-10 right-10"
          />
          <img
            draggable={false}
            src={image4}
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
