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
import { Button, Container, Link, Skeleton, TextField } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import CardItem from "../reusableComponents/CardItem";
import LoadingSkeletonCard from "../reusableComponents/LoadingSkeletonCard";
import LoadingSkeletonArticle from "../reusableComponents/LoadingSkeletonArticle";

const HomePagePanel = () => {
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const [isLoadingLeftField, setLoadingLeftField] = useState(true);
  const [isLoadingRightField, setLoadingRightField] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [topRatedArticleList, setTopRatedArticleList] = useState([]);
  const [latestArticleList, setLatestArticleList] = useState([]);

  //_ Update when page resolution changes
  useEffect(() => {
    if (innerWidth === null) {
      setIsMobile(false);
    } else {
      setIsMobile(innerWidth < MOBILE_SCREEN_SIZE ? true : false);
    }
  }, [innerWidth]);

  useEffect(() => {
    setLoadingLeftField(true);
    setLoadingRightField(true);
    console.log("use effect çalıştı");
    fetch("/api/article-list-toprated")
      .then((res) => res.json())
      .then((data) => {
        setTopRatedArticleList(data?.article_list_toprated);
        setLoadingLeftField(false);
      });
    fetch("/api/article-list-latest")
      .then((res) => res.json())
      .then((data) => {
        setLatestArticleList(data?.article_list_latest);
        setLoadingRightField(false);
      });
  }, []);

  const LeftField = () => {
    // Google Ads
    return (
      <>
        <div className={styles.PanelContainerStyle}>
          <div className={styles.HomePageInfoStyle}>
            <h1>Top Rated</h1>
            {isLoadingLeftField && <LoadingSkeletonCard isLoading />}
            {!isLoadingLeftField && (
              <>
                <LoadingSkeletonCard isLoading={false} />
                {topRatedArticleList?.rows?.map((item) => (
                  <CardItem
                    url={item.url}
                    title={item.title}
                    creationDate={item.createDate}
                    topicList={item.topicname.split(",")}
                    body={item.body}
                    titleimage={item.titleimage}
                    titleimageAlt={item.titleimageAlt}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </>
    );
  };

  const RightField = () => {
    return (
      <>
        <div className={styles.PanelContainerStyle}>
          <div className={styles.HomePageInfoStyle}>
            <h1>Latest</h1>
            {isLoadingRightField && <LoadingSkeletonCard isLoading />}
            {!isLoadingRightField && (
              <>
                <LoadingSkeletonCard isLoading={false} />
                {latestArticleList?.rows?.map((item) => (
                  <CardItem
                    url={item.url}
                    title={item.title}
                    creationDate={item.createDate}
                    topicList={item.topicname.split(",")}
                    body={item.body}
                    titleimage={item.titleimage}
                    titleimageAlt={item.titleimageAlt}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </>
    );
  };

  // if (!topRatedArticleList) return <p>Mesaj Listesi Boş</p>;
  // if (isLoading) {
  //   return <Loading isLoading/>;
  // } else {
  return (
    <>
      {/* <Loading isLoading={false}/> */}
      <div className={styles.ContainerPageContainerStyle}>
        <div className={styles.HeaderStyle}>
          <Header />
        </div>
        <div className={styles.ContentStyle}>
          {!isMobile && (
            <Container maxWidth="lg">
              <MyGrid
                leftContent={<LeftField />}
                rightContent={<RightField />}
              />
            </Container>
          )}
          {isMobile && (
            <MyGrid leftContent={<LeftField />} rightContent={<RightField />} />
          )}
        </div>
        <FooterPanel />

        <Analytics />
      </div>
    </>
  );
  // }
};

export default HomePagePanel;
