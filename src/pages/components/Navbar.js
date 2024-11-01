"use client";
import React, { useEffect, useState } from "react";
import NavbarItem from "./NavbarItem";
import styles from "./Navbar.module.scss";
import { Autocomplete, Container, Divider, TextField } from "@mui/material";
import TopicList from "../../components/TopicList";
import useWindowSize from "@rooks/use-window-size";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";
import LinearProgress from "@mui/material/LinearProgress";
import { red } from "@mui/material/colors";
import useLanguages from "../../hooks/useLanguages";
import useProjectSpecialFields from "../../hooks/useProjectSpecialFields";

export default function Navbar() {
  const LABELS = useLanguages();
  const { innerWidth } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  const [topMenuList, setTopMenuList] = useState([]);
  const [isRefreshingTopMenuList, setIsRefreshingTopMenuList] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const specialFields = useProjectSpecialFields();

  useEffect(() => {
    if (innerWidth === null) {
      setIsMobile(false);
    } else {
      setIsMobile(innerWidth < MOBILE_SCREEN_SIZE);
    }

    fetch("/api/core-page/list_all_url")
      .then((res) => res.json())
      .then((table) => {
        setTopMenuList(table?.data?.rows);
      });

    setIsLoading(false);
  }, [innerWidth]);

  return (
    <>
      <Divider />
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
              {topMenuList?.map((item) => (
                <>
                  <NavbarItem
                    id={item?.page_name}
                    key={item?.page_name}
                    title={item?.page_name}
                    param={item?.url}
                  />
                </>
              ))}
              <NavbarItem
                id="mainpage"
                key="mainpage"
                title={specialFields?.main_page_name || LABELS.MAINPAGE}
                param="/"
              />
            </div>
          </Container>
        </>
      )}
      <Divider />
      <br />
    </>
  );
}
