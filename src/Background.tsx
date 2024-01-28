import React from "react";
import bgImage from "./assets/Rectangle 2.png";
import image1 from "./assets/image 11.png";
import image2 from "./assets/image 13.png";
import image3 from "./assets/image 16.png";
import image4 from "./assets/image 12.png";
import image5 from "./assets/image 15.png";
// import './styles.css'

function Background({children}: {children: React.ReactNode}) {
  return (
    <div className="w-[100vw] h-[100vh] bg-cyan-400 p-12  border-red-100 rounded">
      <div className="w-full h-full rounded-[30px] overflow-hidden relative flex justify-center items-center">
        <img draggable={false} src={bgImage} className="absolute w-full" />
        <img draggable={false} src={image2} className="absolute left-0 top-0" />
        <img draggable={false}
          src={image3}
          className="absolute top-[50%] translate-y-[-50%] left-32"
        />
        <img draggable={false} src={image1} className="absolute bottom-10 left-10" />
        <img draggable={false} src={image5} className="absolute top-10 right-10" />
        <img draggable={false} src={image4} className="absolute bottom-0 right-10" />
        {children}
      </div>
    </div>
  );
}

export default Background;
