"use client";
import styles from "./FooterPanel.module.scss";
import { Grid } from "@mui/material";
import React from "react";
import { useCallback, useContext, useEffect, useState } from "react";
import useWindowSize from "@rooks/use-window-size";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";
import MyGrid from "../toolComponents/MyGrid";
import useProjectSpecialFields from "../../hooks/useProjectSpecialFields";

const FooterPanel = () => {
  //_ MobilePart
  const { innerWidth } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  const specialFields = useProjectSpecialFields();

  useEffect(() => {
    if (innerWidth === null) {
      setIsMobile(false);
    } else {
      setIsMobile(innerWidth < MOBILE_SCREEN_SIZE);
    }
  }, [innerWidth]);

  const LeftContent = () => {
    return (
      <div className={styles.PanelContainerStyle}>
        <div className={styles.FooterContentStyle}>
          <div
            dangerouslySetInnerHTML={{
              __html: specialFields?.footer_copyright || "",
            }}
          />
          {isMobile ? " " : <br />}
          {specialFields?.footer_company}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.footerStyle}>
      <MyGrid
        leftContent={<LeftContent />}
        isOneFullContent={true}
        isHideWhileLoading={true}
      />
    </div>
  );
};

export default FooterPanel;
