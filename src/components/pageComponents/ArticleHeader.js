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
import Image from "next/image";
import { format } from "date-fns";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Divider from "@mui/material/Divider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MessageIcon from "@mui/icons-material/Message";
import LinearProgress from "@mui/material/LinearProgress";
import LoadingFullPage from "../../components/reusableComponents/LoadingFullPage";

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
  const [isLoading, setIsLoading] = useState(false);

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
        let watchCount = parseInt(data2?.watchCount?.rows[0]?.count, 10);
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

  const tagSelectedAction = (topic) => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      router.push("/?search=" + topic);
      setIsLoading(false);
    }, 200);
    return () => {
      clearTimeout(handler);
    };
  };

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
              <span style={{ marginLeft: "5px" }}>{like_number}</span>
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

            {/* <div style={{ float: "right", marginLeft: "25px" }}>
              <IconButton
                aria-label="view"
                size="medium"
                style={{ padding: "0px" }}
                color={"default"}
                href={"#commentsContentId"}
              >
                <MessageIcon fontSize="inherit" />
              </IconButton>
              <span style={{ marginLeft: "5px" }}>
                {article?.comment_number}
              </span>
            </div> */}
          </>
        </div>
      </>
    );
  };
  const ContentField = () => {
    return (
      <>
        <div className={styles.HomePageInfoStyle}>
          {article?.is_core_page && (
            <h1 style={{ marginTop: "0px", textAlign: "center" }}>
              {article?.title}
            </h1>
          )}

          {!article?.is_core_page && (
            <>
              <h1 style={{ marginTop: "0px" }}>{article?.title}</h1>
              <Divider />
              <div className={styles.HeaderActionsContainerStyle}>
                {isMobile && (
                  <>
                    <MyGrid
                      isOneFullContent
                      leftContent={
                        <>
                          <span className={styles.CardHeaderDateStyle}>
                            {article?.create_date &&
                              format(article?.create_date, "dd/MM/yyyy")}
                          </span>

                          {!(isLoadedLike && isLoadedWatch) && (
                            <LinearProgress color="success" />
                          )}

                          {isLoadedLike && isLoadedWatch && (
                            <RightContentField />
                          )}
                        </>
                      }
                    />

                    <MyGrid
                      isOneFullContent
                      leftContent={
                        <div
                          style={
                            isMobile
                              ? {
                                  alignItems: "center",
                                  marginLeft: "-5px",
                                  marginTop: "10px",
                                }
                              : { alignItems: "center", marginLeft: "-5px" }
                          }
                        >
                          {article?.topics?.split(",")?.map(
                            (topic) =>
                              topic && (
                                <button
                                  key={"ContentField" + article?.title}
                                  className={styles.TopicChipStyle}
                                  onClick={() => tagSelectedAction(topic)}
                                >
                                  {topic}
                                </button>
                              )
                          )}
                        </div>
                      }
                    />
                  </>
                )}

                {!isMobile && (
                  <MyGrid
                    leftContent={
                      <span className={styles.CardHeaderDateStyle}>
                        {article?.create_date &&
                          format(article?.create_date, "dd/MM/yyyy")}
                      </span>
                    }
                    middleContent={
                      <div style={{ alignItems: "center" }}>
                        {article?.topics?.split(",")?.map(
                          (topic) =>
                            topic && (
                              <button
                                key={
                                  "ContentFieldMid" +
                                  article?.title +
                                  Math.floor(Math.random() * 1000000000000)
                                }
                                className={styles.TopicChipStyle}
                                onClick={() => router.push("/?search=" + topic)}
                              >
                                {topic}
                              </button>
                            )
                        )}
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
                )}
              </div>
              <Divider />
            </>
          )}
        </div>
      </>
    );
  };

  const likeAction = async () => {
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
      }
    }
  };

  return (
    <>
      <LoadingFullPage isLoading={isLoading} />
      <MyGrid leftContent={<ContentField />} isOneFullContent />
    </>
  );
  // }
};

export default ArticleHeader;
