"use client";
import React, { useEffect, useState } from "react";
import styles from "./NavbarAdminPanel.module.scss";
import { Autocomplete, Container, Divider, TextField } from "@mui/material";
import useWindowSize from "@rooks/use-window-size";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";
import LinearProgress from "@mui/material/LinearProgress";
import NavbarItemAdminPanel from "./NavbarItemAdminPanel";
import useLanguages from "../../hooks/useLanguages";

export default function NavbarAdminPanel() {
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
          <Divider />
          <Container maxWidth="lg">
            <div className={styles.NavbarContainerStyle}>
              <NavbarItemAdminPanel
                title={LABELS.CONTENT_PAGES}
                param="/AdminPanel/contentPage"
              />
              <NavbarItemAdminPanel
                title={LABELS.SUBJECT}
                param="/AdminPanel/tag"
              />
              <NavbarItemAdminPanel
                title={LABELS.DESIGN}
                param="/AdminPanel/design"
              />
              <NavbarItemAdminPanel
                title={isMobile ? LABELS.PAGES_MOBILE : LABELS.PAGES}
                param="/AdminPanel/corePage"
              />
              <NavbarItemAdminPanel
                title={
                  isMobile ? LABELS.MAIN_SETTINGS_MOBILE : LABELS.MAIN_SETTINGS
                }
                param="/AdminPanel"
              />
            </div>
          </Container>
          <Divider />
        </>
      )}
    </>
  );
}
