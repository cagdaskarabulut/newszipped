"use client";
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styles from "./MyCarousel.module.scss";
import { Container, LinearProgress, Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";
import CrudTable from "./CrudTable";

const MyCarousel = () => {
  const [sliderArticleList, setSliderArticleList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/banner_list/`)
      .then((res) => res.json())
      .then((data) => {
        setSliderArticleList(data?.article_url_list?.rows || []);
      });
  }, []);

  const handleImageClick = (url) => {
    router.push("/" + url);
  };

  return (
    <Container maxWidth="lg">
      <div className={styles.MyCarouselContainer}>
        {sliderArticleList.length > 0 ? (
          <Carousel autoPlay interval={10000} infiniteLoop>
            {sliderArticleList.map((object, index) => (
              <div
                key={"slider_" + index}
                style={{ cursor: "pointer" }}
                onClick={() => handleImageClick(object.url)}
              >
                <img
                  src={object.title_image}
                  alt={"slider_" + object.url}
                  style={
                    object?.is_banner_fit_style
                      ? {
                          objectFit: "contain",
                          height: "300px",
                          width: "100%",
                        }
                      : object?.is_banner_stretch_style
                      ? {
                          height: "300px",
                          width: "100%",
                        }
                      : {
                          height: "300px",
                          overflow: "hidden",
                        }
                  }
                />
                <p className="legend">{object.title}</p>
              </div>
            ))}
          </Carousel>
        ) : (
          <Skeleton variant="rectangular" height={300} />
          // <div
          //   style={{
          //     height: "300px",
          //     width: "100%",
          //     alignContent: "center",
          //     verticalAlign: "middle",
          //     textAlign: "center",
          //   }}
          // >
          //   <LinearProgress color="error" />
          // </div>
        )}
      </div>
    </Container>
  );
};

export default MyCarousel;
