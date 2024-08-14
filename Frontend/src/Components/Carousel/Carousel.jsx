import { useEffect, useState } from "react";
import "./carousel.styles.scss";
import { current } from "@reduxjs/toolkit";

const Carousel = ({ data }) => {
  // const isMultiImage = Array.isArray(data) && data.length > 1;

  // const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   if (data.length === 0) return;
  //   if (isMultiImage) {
  //     const interval = setInterval(() => {
  //       setCurrentIndex((prevState) => {
  //         if (prevState == data.length - 1) {
  //           return (prevState = 0);
  //         } else {
  //           return prevState + 1;
  //         }
  //       });

  //       return () => {
  //         clearInterval(interval);
  //       };
  //     }, 8000);
  //   }
  // }, []);

  // const imageSrc = isMultiImage ? data[currentIndex].image : data.image;

  return (
    <div className="carousel-wrapper">
      {/* <img src={imageSrc} alt="carousel" /> */}
    </div>
  );
};

export default Carousel;
