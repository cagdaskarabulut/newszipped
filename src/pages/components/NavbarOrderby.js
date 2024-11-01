"use client";
import React, { useEffect, useState } from "react";
import NavbarItemOrderBy from "./NavbarItemOrderBy";
import styles from "./NavbarOrderby.module.scss";
import { Autocomplete, Container, Divider, TextField } from "@mui/material";
import useWindowSize from "@rooks/use-window-size";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";
import LinearProgress from "@mui/material/LinearProgress";
import useLanguages from "../../hooks/useLanguages";
import { useSearchParams } from "next/navigation";

export default function NavbarOrderby() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const LABELS = useLanguages();
  const { innerWidth } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  const [topicList, setTopicList] = useState([]);
  const [isRefreshingTopicList, setIsRefreshingTopicList] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (innerWidth === null) {
      setIsMobile(false);
    } else {
      setIsMobile(innerWidth < MOBILE_SCREEN_SIZE);
    }
    setIsLoading(false);
  }, [innerWidth]);

  const addSearchPartIfNeeded = () => {
    if (search) {
      return "search=" + search + "&";
    } else {
      return "";
    }
  };

  return (
    <>
      {isLoading && (
        <>
          <div className={styles.NavbarContainerStyle}>
            <LinearProgress
              color="success"
              style={{
                marginTop: "25px",
                marginBottom: "25px",
              }}
            />
          </div>
        </>
      )}

      {!isLoading && (
        <>
          <Container maxWidth="lg">
            <div className={styles.NavbarContainerStyle}>
              <NavbarItemOrderBy
                size="small"
                isShowOrderByIcon={true}
                title={
                  isMobile
                    ? LABELS.ORDER_BY_LATEST_TITLE_MOBILE
                    : LABELS.ORDER_BY_LATEST_TITLE_DESKTOP
                }
                url={"/?" + addSearchPartIfNeeded() + "orderby=create_date"}
                name="create_date"
              />
              <NavbarItemOrderBy
                size="small"
                isShowOrderByIcon={true}
                title={
                  isMobile
                    ? LABELS.ORDER_BY_LIKES_TITLE_MOBILE
                    : LABELS.ORDER_BY_LIKES_TITLE_DESKTOP
                }
                url={"/?" + addSearchPartIfNeeded() + "orderby=like_number"}
                name="like_number"
              />
              <NavbarItemOrderBy
                size="small"
                isShowOrderByIcon={true}
                title={
                  isMobile
                    ? LABELS.ORDER_BY_VIEWS_TITLE_MOBILE
                    : LABELS.ORDER_BY_VIEWS_TITLE_DESKTOP
                }
                url={"/?" + addSearchPartIfNeeded() + "orderby=view_number"}
                name="view_number"
              />
              <NavbarItemOrderBy
                size="small"
                isShowOrderByIcon={true}
                title={
                  isMobile
                    ? LABELS.ORDER_BY_COMMENTS_TITLE_MOBILE
                    : LABELS.ORDER_BY_COMMENTS_TITLE_DESKTOP
                }
                url={"/?" + addSearchPartIfNeeded() + "orderby=comment_number"}
                name="comment_number"
              />
            </div>
          </Container>
        </>
      )}
    </>
  );
}
