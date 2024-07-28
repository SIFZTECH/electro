// components/Magnifier.js
import React, { useState, useRef } from "react";
import styles from "./Magnifier.module.css";
import Image from "next/image";

const Magnifier = ({ src, alt, width, height }) => {
  const [isMagnifying, setIsMagnifying] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef(null);

  const handleMouseEnter = () => setIsMagnifying(true);
  const handleMouseLeave = () => setIsMagnifying(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const { top, left, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Ensure magnifier stays within the bounds of the image
    const magnifierSize = 100; // Size of the magnifying glass
    const maxX = Math.min(x - magnifierSize / 2, width - magnifierSize);
    const maxY = Math.min(y - magnifierSize / 2, height - magnifierSize);
    setPosition({
      top: Math.max(0, maxY),
      left: Math.max(0, maxX),
    });
  };

  return (
    <div
      ref={containerRef}
      className={styles.magnifierContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        className={styles.image}
      />
      {isMagnifying && (
        <div
          className={styles.magnifier}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            backgroundImage: `url(${src})`,
            backgroundSize: `${containerRef.current?.offsetWidth * 2}px ${
              containerRef.current?.offsetHeight * 2
            }px`,
            backgroundPosition: `-${position.left * 2}px -${
              position.top * 2
            }px`,
          }}
        ></div>
      )}
    </div>
  );
};

export default Magnifier;
