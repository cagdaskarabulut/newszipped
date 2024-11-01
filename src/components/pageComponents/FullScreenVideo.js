"use client";
import React, { useState, useEffect } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import styles from "./FullScreenVideo.module.scss";

const FullScreenVideo = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  let introHref = `https://karabulut-storage.s3.amazonaws.com/${process.env.PROJECT_SITE_NAME}/intro.mp4`;

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      document.getElementById("video-container").style.height = `${height}px`;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const timer = setTimeout(() => {
      setIsLoaded(true); // 1 saniye sonra videoContainer'ı görünür yap
    }, 1000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.getElementById("next-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      id="video-container"
      className={`${styles.videoContainer} ${isLoaded ? styles.visible : ""}`}
    >
      <video className={styles.video} autoPlay muted playsInline>
        <source src={introHref} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.scrollIconContainer} onClick={handleScrollDown}>
        <div className={styles.animatedIcon}>
          <ArrowDownwardIcon className={styles.scrollIcon} />
        </div>
      </div>
    </div>
  );
};

export default FullScreenVideo;
