"use client";
import React from "react";
import styles from "./ArticleHeader.module.scss";
import Header from "../mainComponents/Header";
import { useEffect, useState } from "react";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";
import useWindowSize from "@rooks/use-window-size";
import FooterPanel from "../mainComponents/FooterPanel";
import MyGrid from "../toolComponents/MyGrid";
import { Analytics } from "@vercel/analytics/react";
import { useRouter } from "next/navigation";
import Autocomplete from "@mui/material/Autocomplete";
import {
  Backdrop,
  Button,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Link,
  Skeleton,
  TextField,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import CardItem from "../reusableComponents/CardItem";
import LoadingSkeletonCard from "../reusableComponents/LoadingSkeletonCard";
import LoadingSkeletonArticle from "../reusableComponents/LoadingSkeletonArticle";
import Image from "next/image";
import { format } from "date-fns";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Divider from "@mui/material/Divider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MessageIcon from "@mui/icons-material/Message";
import LinearProgress from "@mui/material/LinearProgress";

const ArticleHeader = ({ article }) => {
  const router = useRouter();
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [like_number, setLike_number] = useState(0);
  const [watch_number, setWatch_number] = useState(0);
  const [isLoadedLike, setIsLoadedLike] = useState(false);
  const [isLoadedWatch, setIsLoadedWatch] = useState(false);

  useEffect(() => {
    setIsAuthChecked(false);
    fetch("/api/auth/whoAmI/email")
      .then((res) => res.json())
      .then((data) => {
        setUserEmail(data.email);
        setIsAuthChecked(true);
        fetch(
          "/api/article/article_likeCountByUser/" +
            article?.url +
            "/likeCountByUser/" +
            data?.email
        )
          .then((res2) => res2.json())
          .then((data2) => {
            let likeCount = parseInt(data2.likeCount.rows[0].count, 10);
            setLike_number(likeCount);
            let result = likeCount > 0;
            setIsLiked(result);
            setIsLoadedLike(true);
          });
      });

    fetch("/api/article/article_watchCountByUrl/" + article?.url)
      .then((res2) => res2.json())
      .then((data2) => {
        let watchCount = parseInt(data2.watchCount.rows[0].count, 10);
        setWatch_number(watchCount);
        setIsLoadedWatch(true);
      });
  }, []);

  //_ Update when page resolution changes
  useEffect(() => {
    if (innerWidth === null) {
      setIsMobile(false);
    } else {
      setIsMobile(innerWidth < MOBILE_SCREEN_SIZE ? true : false);
    }
  }, [innerWidth]);

  const RightContentField = () => {
    return (
      <>
        <div style={{ float: "right" }}>
          <>
            <div style={{ float: "right", marginLeft: "25px" }}>
              <IconButton
                aria-label="like"
                size="medium"
                style={{ padding: "0px" }}
                color={isLiked ? "success" : "default"}
                onClick={() => likeAction()}
              >
                <ThumbUpIcon fontSize="inherit" />
              </IconButton>
              <span style={{ marginLeft: "5px" }}>
                {/* {article?.like_number} */}
                {like_number}
              </span>
            </div>

            <div style={{ float: "right", marginLeft: "25px" }}>
              <IconButton
                aria-label="view"
                size="medium"
                style={{ padding: "0px" }}
                color={"default"}
              >
                <VisibilityIcon fontSize="inherit" />
              </IconButton>
              <span style={{ marginLeft: "5px" }}>{watch_number}</span>
            </div>

            <div style={{ float: "right", marginLeft: "25px" }}>
              <IconButton
                aria-label="view"
                size="medium"
                style={{ padding: "0px" }}
                color={"default"}
              >
                <MessageIcon fontSize="inherit" />
              </IconButton>
              <span style={{ marginLeft: "5px" }}>
                {article?.comment_number}
              </span>
            </div>
          </>
        </div>
      </>
    );
  };
  const ContentField = () => {
    return (
      <>
        <div className={styles.HomePageInfoStyle}>
          <h1>{article?.title}</h1>

          <Divider />
          <div className={styles.HeaderActionsContainerStyle}>
            <MyGrid
              leftContent={
                <span className={styles.CardHeaderDateStyle}>
                  {article?.create_date &&
                    format(article?.create_date, "dd/MM/yyyy")}
                </span>
              }
              middleContent={
                <div style={{ alignItems: "center" }}>
                  {article?.topics?.split(",")?.map((topic) => (
                    <Chip
                      className={styles.TopicChipStyle}
                      label={topic}
                      size="small"
                      onClick={() => console.log("chip tıklandı")}
                    />
                  ))}
                </div>
              }
              rightContent={
                <>
                  {!(isLoadedLike && isLoadedWatch) && (
                    <LinearProgress color="success" />
                  )}

                  {isLoadedLike && isLoadedWatch && <RightContentField />}
                </>
              }
            />
          </div>
          <Divider />

          {/* //TODO medium daki like ve yorum alanına benzer bir tool geliştir, tarihi de bu tool içerisine alabilirsin
           */}
        </div>
      </>
    );
  };

  const likeAction = async () => {
    // setIsLoading(true);
    if (!userEmail) {
      router.push("/api/auth/signin", { scroll: false });
    } else if (isLiked) {
      setIsLiked(false);
      setLike_number(parseInt(like_number, 10) - 1);
      //_ DELETE LIKE
      try {
        fetch("/api/article/delete_like", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: article?.url,
            user_email: userEmail,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setIsLiked(false);
            setLike_number(parseInt(like_number, 10) - 1);
            // setIsLoading(false);
          });
      } catch (error) {
        // setErrorMessage("Like action failed");
        // setIsLoading(false);
        console.log(error);
      }
    } else {
      //_ ADD LIKE
      try {
        fetch("/api/article/add_like", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: article?.url,
            user_email: userEmail,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            setIsLiked(true);
            setLike_number(parseInt(like_number, 10) + 1);
            // setIsLoading(false);
          });
      } catch (error) {
        // setErrorMessage("Like action failed");
        // setIsLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <>
      <MyGrid leftContent={<ContentField />} isOneFullContent />
    </>
  );
  // }
};

export default ArticleHeader;
