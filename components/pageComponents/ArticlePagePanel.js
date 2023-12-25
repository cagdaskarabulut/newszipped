import React from "react";
import styles from "./HomePagePanel.module.scss";
import Header from "../mainComponents/Header";
import { useEffect, useState } from "react";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";
import useWindowSize from "@rooks/use-window-size";
import FooterPanel from "../mainComponents/FooterPanel";
import MyGrid from "../toolComponents/MyGrid";
import { Analytics } from "@vercel/analytics/react";
import Autocomplete from "@mui/material/Autocomplete";
import { Button, Container, Link, TextField } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import CardItem from "../reusableComponents/CardItem";

const ArticlePagePanel = (article) => {
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const [isLoading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  //_ Update when page resolution changes
  useEffect(() => {
    if (innerWidth === null) {
      setIsMobile(false);
    } else {
      setIsMobile(innerWidth < MOBILE_SCREEN_SIZE ? true : false);
    }
  }, [innerWidth]);

  if (isLoading) return <p>Yükleniyor...</p>;

  const ContentField = () => {
    return (
      <>
      {/* id, topicname, url, title, titleimage, body, createdate, likenumber */}
        <h1>{title}</h1>
        <Image
            src={titleimage}
            alt={"img_" + titleimageAlt}
            key={"img_" + titleimageAlt}
            objectFit="contain"
          />
      </>
    );
  };

  return (
    <>
      <div className={styles.ContainerPageContainerStyle}>
        <div className={styles.HeaderStyle}>
          <Header pageList={pageList} />
        </div>
        <div className={styles.ContentStyle}>
          {!isMobile && (
            <Container maxWidth="lg">
              <MyGrid leftContent={<ContentField />} isOneFullContent />
            </Container>
          )}
          {isMobile && (
            <MyGrid leftContent={<ContentField />} isOneFullContent />
          )}
        </div>
        <FooterPanel />

        <Analytics />
      </div>
    </>
  );
};

export default ArticlePagePanel;
