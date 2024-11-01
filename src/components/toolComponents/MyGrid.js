"use client";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import useWindowSize from "@rooks/use-window-size";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";
import styles from "./MyGrid.module.scss";
import Image from "next/image";

//- Tek kolon varsa sadece "leftContent" girilir.
//- Kolon tam ekran olacaksa  "isOneFullContent: true" yapılır. Bu seçim yapılmazsa normalde ekranın yarısını kaplarken mobilde tamamını kaplar.
//- 2 kolon olacaksa sadece leftcontent ve rightcontent girilir.
//- ContentPosition default değeri start, örneğin footer da center gönderilir
const MyGrid = ({
  breadcrumbs,
  title,
  leftContent,
  middleContent,
  rightContent,
  isRightContentSmall,
  isLeftContentSmall,
  isOneFullContent,
  contentPosition,
  forHeader,
  isStaticWidth,
  isHideRightSideOnMobile,
  isHideWhileLoading,
  isShowLoadingBarWhileLoading,
  isLeftContentSticky,
}) => {
  //_ MobilePart
  const { innerWidth } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  const [isFinallyOneFullContent, setIsFinallyOneFullContent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsFinallyOneFullContent(isOneFullContent);
    if (innerWidth === null) {
      setIsMobile(false);
    } else {
      let nowMobile = innerWidth < MOBILE_SCREEN_SIZE;
      setIsMobile(nowMobile);
      if (nowMobile && isHideRightSideOnMobile) {
        setIsFinallyOneFullContent(true);
      }
    }
    setIsLoading(false);
  }, [innerWidth]);

  contentPosition = contentPosition ? contentPosition : "start";

  return (
    <>
      {isLoading && isHideWhileLoading && (
        <>
          {isShowLoadingBarWhileLoading && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <>
                <Image
                  src="./spinner.svg"
                  alt="spinner"
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </>
            </div>
          )}
          {!isShowLoadingBarWhileLoading && <></>}
        </>
      )}
      {(!isHideWhileLoading || (isHideWhileLoading && !isLoading)) && (
        <div>
          {breadcrumbs}
          {title != undefined && <h2 className={styles.titleStyle}>{title}</h2>}
          <Grid
            spacing={2}
            container
            direction="row"
            justifyContent={contentPosition}
            alignItems={contentPosition}
            columns={18}
          >
            {/* 1 columns */}
            {isFinallyOneFullContent && (
              <Grid item xs={18}>
                {leftContent}
              </Grid>
            )}

            {/* 2 columns */}
            {!isFinallyOneFullContent && !middleContent && (
              <>
                <Grid
                  item
                  className={isLeftContentSticky && styles.sticky}
                  xs={
                    isMobile && !isStaticWidth
                      ? 18
                      : isRightContentSmall
                      ? 14
                      : isLeftContentSmall
                      ? 4
                      : 12
                  }
                >
                  {leftContent}
                </Grid>
                <Grid
                  item
                  xs={
                    isMobile && !isStaticWidth
                      ? 18
                      : isRightContentSmall
                      ? 4
                      : isLeftContentSmall
                      ? 14
                      : 6
                  }
                >
                  {rightContent}
                </Grid>
              </>
            )}

            {/* 3 columns */}
            {!isFinallyOneFullContent && middleContent && (
              <>
                <Grid
                  item
                  xs={
                    isMobile && !isStaticWidth
                      ? forHeader
                        ? 4
                        : 18
                      : forHeader
                      ? 4
                      : 5
                  }
                >
                  {leftContent}
                </Grid>
                <Grid
                  item
                  xs={
                    isMobile && !isStaticWidth
                      ? forHeader
                        ? 10
                        : 18
                      : forHeader
                      ? 10
                      : 8
                  }
                >
                  {middleContent}
                </Grid>
                <Grid
                  item
                  xs={
                    isMobile && !isStaticWidth
                      ? forHeader
                        ? 4
                        : 18
                      : forHeader
                      ? 4
                      : 5
                  }
                >
                  {rightContent}
                </Grid>
              </>
            )}
          </Grid>
        </div>
      )}
    </>
  );
};

export default MyGrid;

/********************************************************************************************************/
