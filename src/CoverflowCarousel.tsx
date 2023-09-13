import { useState } from "react";
import "./CoverflowCarousel.css"; // Import your CSS or SCSS styles

const PaginationDots = ({
  numDots,
  currentIndex,
  handleDotClick,
}: {
   numDots: number;
  currentIndex: number;
  handleDotClick: (dotIndex: number) => void;
}) => {
  const dots = Array.from({ length: numDots }, (_, i) => i);

  return (
    <div className="pagination-dots">
      {dots.map((dotIndex) => (
        <span
          key={dotIndex}
          className={`dot ${dotIndex === currentIndex ? "active" : ""}`}
          onClick={() => handleDotClick(dotIndex)}
        />
      ))}
    </div>
  );
};

const CoverflowCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(currentIndex);

  const images = [
    "/pic1.png",
    "/pic2.png",
    "/pic3.png",
    "/pic4.png",
    "/pic5.png",
  ];

  const numImages = images.length;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + numImages) % numImages);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % numImages);
  };

  const handleDotClick = (dotIndex: number) => {
    setCurrentIndex(dotIndex);
  };

  console.log(currentIndex);

  const currentImages = Array.from({ length: numImages }, (_, i) => {
    const index = (currentIndex + i) % numImages;
    return images[index];
  });

  const activeIndex = Math.floor(numImages / 2);

  return (
    <>
      <h1 className="headingText">Featured Products</h1>
      <p className="subText">
        Explore and discover a variety of tourist places
      </p>
      <div className="coverflow-carousel">
        <div className="carousel-container">
          {currentImages.map((image, index) => {
            const distanceFromActive = Math.abs(index - activeIndex);
            const scale = 1 - 0.2 * distanceFromActive;
            const zIndex = activeIndex - distanceFromActive + 1;
            const imgCurrIndex =
              (currentIndex + (index - activeIndex)) % numImages;

            return (
              <div
                key={index}
                className={`carousel-item ${
                  index === activeIndex ? "active" : ""
                }`}
                style={{
                  transform: `translateX(${
                    (index - activeIndex) * 15
                  }vw) scale(${scale})`,
                  zIndex: zIndex,
                }}
                onClick={() =>
                  setCurrentIndex(
                    imgCurrIndex > 0 ? imgCurrIndex : numImages + imgCurrIndex
                  )
                }
              >
                <img src={image} alt={`Image ${index + 1}`} />
              </div>
            );
          })}
        </div>
        <div className="navigation">
          <button onClick={handlePrev} className="prev-button">
            <img src="/arrow-left.svg" />
          </button>
          <PaginationDots
            numDots={numImages}
            currentIndex={currentIndex}
            handleDotClick={handleDotClick}
          />
          <button onClick={handleNext} className="next-button">
            <img src="/arrow-right.svg" />
          </button>
        </div>
      </div>
    </>
  );
};

export default CoverflowCarousel;
