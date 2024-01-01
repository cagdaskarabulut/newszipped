import React from "react";
import styles from "./ArticlePagePanel.module.scss";
import Header from "../mainComponents/Header";
import { useEffect, useState } from "react";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";
import useWindowSize from "@rooks/use-window-size";
import FooterPanel from "../mainComponents/FooterPanel";
import MyGrid from "../toolComponents/MyGrid";
import { Analytics } from "@vercel/analytics/react";
import Autocomplete from "@mui/material/Autocomplete";
import { Button, Container, Link, Skeleton, TextField } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import CardItem from "../reusableComponents/CardItem";
import LoadingSkeletonCard from "../reusableComponents/LoadingSkeletonCard";
import LoadingSkeletonArticle from "../reusableComponents/LoadingSkeletonArticle";
import Image from "next/image";
import { format } from "date-fns";

const ArticlePagePanel = ({ article }) => {
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);

  //_ Update when page resolution changes
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
          <div className={styles.HomePageInfoStyle}>
            <h1>{article.title}</h1>
            <span className={styles.CardHeaderDateStyle}>
              {format(article.create_date, "dd/MM/yyyy")}
            </span>

            {/* //TODO medium daki like ve yorum alanına benzer bir tool geliştir, tarihi de bu tool içerisine alabilirsin   
            <br/><span className={styles.CardHeaderDateStyle}>{article.like_number}</span> 
            */}

            <br />
            {/* <Image
              src={article.title_image}
              alt={"img_" + article.url}
              key={"img_" + article.url}
              width={100}
              height={100}
              objectFit="contain"
            /> */}
            
            <div
              style={{ width: "100%", height: "50vh", position: "relative" }}
            >
              {article.title_image && (
                <Image
                src={article.title_image}
                alt={"img_" + article.url}
                fill={true}
                objectFit="contain"
              />)
              }
              
            </div>
            <div dangerouslySetInnerHTML={{ __html: article.body }}></div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className={styles.ContainerPageContainerStyle}>
        <div className={styles.HeaderStyle}>
          <Header />
        </div>
        <Container maxWidth="md" className={styles.ContentStyle}>
          <MyGrid leftContent={<ContentField />} isOneFullContent />
        </Container>
        <FooterPanel />

        <Analytics />
      </div>
    </>
  );
  // }
};

export default ArticlePagePanel;
