import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

const imageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const Magnifier = ({ src, alt, width, height }) => {
  const magnifierContainerRef = useRef(null);
  const largeImageContainerRef = useRef(null);
  const largeImageRef = useRef(null);
  const lensRef = useRef(null);
  const [largeImageSize, setLargeImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (largeImageRef.current) {
        const { naturalWidth, naturalHeight } = largeImageRef.current;
        setLargeImageSize({ width: naturalWidth, height: naturalHeight });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [src]);

  const handleMouseMove = (e) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { width: imgWidth, height: imgHeight } = target;
    const largeImg = largeImageRef.current;
    const largeImageContainer = largeImageContainerRef.current;
    const lens = lensRef.current;

    if (!largeImg || !largeImageContainer || !lens) return;

    const ratioX = largeImageSize.width / imgWidth;
    const ratioY = largeImageSize.height / imgHeight;
    const lensSize = lens.offsetWidth;
    const xPercent = offsetX / imgWidth;
    const yPercent = offsetY / imgHeight;

    const translateX = -(offsetX * ratioX - lensSize / 2);
    const translateY = -(offsetY * ratioY - lensSize / 2);

    largeImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(2)`;

    let lensX = offsetX - lensSize / 2;
    let lensY = offsetY - lensSize / 2;

    if (lensX < 0) lensX = 0;
    if (lensY < 0) lensY = 0;
    if (lensX + lensSize > imgWidth) lensX = imgWidth - lensSize;
    if (lensY + lensSize > imgHeight) lensY = imgHeight - lensSize;

    lens.style.transform = `translate(${lensX}px, ${lensY}px)`;
  };

  const handleMouseEnter = () => {
    if (largeImageContainerRef.current)
      largeImageContainerRef.current.style.display = "block";
    if (lensRef.current) lensRef.current.style.display = "block";
  };

  const handleMouseLeave = () => {
    if (largeImageContainerRef.current)
      largeImageContainerRef.current.style.display = "none";
    if (lensRef.current) lensRef.current.style.display = "none";
  };

  return (
    <div
      className="magnifier-container"
      ref={magnifierContainerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <Image
        loader={imageLoader}
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className="magnifier-img"
        onLoadingComplete={({ naturalWidth, naturalHeight }) => {
          setLargeImageSize({ width: naturalWidth, height: naturalHeight });
        }}
      />
      <div
        className="magnifier-large-container"
        ref={largeImageContainerRef}
        style={{
          position: "absolute",
          top: "0",
          left: "100%",
          width: `${width}px`,
          height: `${height}px`,
          overflow: "hidden",
          display: "none",
        }}
      >
        <Image
          loader={imageLoader}
          src={src}
          alt={alt}
          layout="fill"
          className="magnifier-img large"
          ref={largeImageRef}
          style={{ transform: "scale(2)", pointerEvents: "none" }}
        />
      </div>
      <div
        className="magnifier-lens"
        ref={lensRef}
        style={{
          position: "absolute",
          width: "100px",
          height: "100px",
          border: "1px solid #000",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          display: "none",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default Magnifier;
