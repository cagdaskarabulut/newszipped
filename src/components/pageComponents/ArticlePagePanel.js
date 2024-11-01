"use client";
import React from "react";
import styles from "./ArticlePagePanel.module.scss";
import Header from "../mainComponents/Header";
import { useEffect, useState } from "react";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";
import useWindowSize from "@rooks/use-window-size";
import FooterPanel from "../mainComponents/FooterPanel";
import MyGrid from "../toolComponents/MyGrid";
import { Analytics } from "@vercel/analytics/react";
import { Container, Divider } from "@mui/material";
import Image from "next/image";
import ArticleHeader from "./ArticleHeader";
import Comments from "./Comments";
import useProjectSpecialFields from "../../hooks/useProjectSpecialFields";
import Navbar from "../../pages/components/Navbar";

const ArticlePagePanel = ({ article }) => {
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  const specialFields = useProjectSpecialFields();

  useEffect(() => {
    fetch("/api/article/add_view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: article?.url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetch("/api/article/increase_view_number", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: article?.url,
          }),
        }).then((res) => res.json());
      });
  }, []);

  //_ Update when page resolution change
  useEffect(() => {
    if (innerWidth === null) {
      setIsMobile(false);
    } else {
      setIsMobile(innerWidth < MOBILE_SCREEN_SIZE ? true : false);
    }
  }, [innerWidth]);

  const ContentField = () => {
    return (
      <>
        <div className={styles.PanelContainerStyle}>
          <Container maxWidth="lg">
            <div className={styles.HomePageInfoStyle}>
              <ArticleHeader article={article} />
              <br />

              {article?.video_path && (
                <div className={styles.ArticleImageContainerStyle}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={article?.video_path}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              {!article?.video_path && article?.title_image && (
                <div className={styles.ArticleImageContainerStyle}>
                  <Image
                    src={article?.title_image}
                    alt={"img_" + article?.url}
                    fill={true}
                    objectFit="contain"
                  />
                </div>
              )}

              <div dangerouslySetInnerHTML={{ __html: article?.body }}></div>
            </div>
          </Container>
        </div>
      </>
    );
  };

  const CommentField = () => {
    return (
      <div
        className={styles.PanelContainerStyle}
        style={{ paddingBottom: "20vh" }}
      >
        <Container maxWidth="lg">
          <div className={styles.HomePageInfoStyle}>
            <Comments article={article} />
          </div>
        </Container>
      </div>
    );
  };

  return (
    <>
      <div className={styles.ContainerPageContainerStyle}>
        <div className={styles.HeaderStyle}>
          {/* <Header /> */}
          <Header specialFields={specialFields} />

          {specialFields?.is_top_menu_active && (
            <>
              <Navbar />
              {/* <div style={{ width: "100%", height: "20px" }}>
                <Divider />
              </div> */}
            </>
          )}
        </div>
        <Container maxWidth="lg" className={styles.ContentStyle}>
          <MyGrid
            leftContent={<ContentField />}
            isOneFullContent
            isHideWhileLoading
          />
          {!article.is_core_page && (
            <MyGrid
              leftContent={<CommentField />}
              isOneFullContent
              isHideWhileLoading
              isShowLoadingBarWhileLoading
            />
          )}
        </Container>
        <br />
        <FooterPanel />
        <Analytics />
      </div>
    </>
  );
  // }
};

export default ArticlePagePanel;
