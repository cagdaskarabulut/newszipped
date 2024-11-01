"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import { CardContent, CardMedia, Chip, Typography } from "@mui/material";
import styles from "./CardItem.module.scss";
import MyAlert from "./MyAlert";
import MyGrid from "../toolComponents/MyGrid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { Backdrop, CircularProgress } from "@mui/material";
import LoadingFullPage from "../../components/reusableComponents/LoadingFullPage";
import Link from "@mui/material/Link";
import useProjectSpecialFields from "../../hooks/useProjectSpecialFields";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";
import useWindowSize from "@rooks/use-window-size";
const CardItem = ({
  url,
  title,
  topics,
  create_date,
  like_number,
  body,
  title_image,
  is_manuel_page,
  isSmallCardStyle,
  isManyCardsInRow,
}) => {
  const { innerWidth } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const [isCopyLinkMessageOpen, setIsCopyLinkMessageOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const specialFields = useProjectSpecialFields();
  const [activeIsSmallCardStyle, setActiveIsSmallCardStyle] = useState(false);
  const [activeIsManyCardsInRow, setActiveIsManyCardsInRow] = useState(false);

  useEffect(() => {
    if (innerWidth === null) {
      setIsMobile(false);
      setActiveIsSmallCardStyle(isSmallCardStyle);
      setActiveIsManyCardsInRow(isManyCardsInRow);
    } else {
      setIsMobile(innerWidth < MOBILE_SCREEN_SIZE);
      setActiveIsSmallCardStyle(
        innerWidth < MOBILE_SCREEN_SIZE ? false : isSmallCardStyle
      );
      setActiveIsManyCardsInRow(
        innerWidth < MOBILE_SCREEN_SIZE ? false : isManyCardsInRow
      );
    }
  }, [innerWidth]);

  async function goToArticlePageAction() {
    setIsLoading(true);
    router.push("/" + url);
  }

  const copylink = (e) => {
    navigator.clipboard.writeText(process.env.PROJECT_URL_WEBSITE + "/" + url);
    setIsCopyLinkMessageOpen(true);
  };

  const HeaderLeftContent = (e) => {
    return (
      <>
        <Link style={{ textDecoration: "none" }} href={"/" + url}>
          <span
            key={"span1_" + url}
            id={"span1_" + url}
            className={styles.CardHeaderTitleStyle}
            onClick={() => goToArticlePageAction()}
          >
            {title}
          </span>
        </Link>

        <br />
        <span
          key={"span2_" + url}
          id={"span2_" + url}
          className={styles.CardHeaderDateStyle}
          onClick={() => goToArticlePageAction()}
        >
          {format(create_date, "dd/MM/yyyy")}
        </span>
      </>
    );
  };

  const HeaderRightContent = (e) => {
    return (
      <div className={styles.CardHeaderRightStyle}>
        <IconButton
          key={"iconButton1_" + url}
          id={"iconButton1_" + url}
          aria-label="share"
          onClick={copylink}
        >
          <ShareIcon />
        </IconButton>
        <MyAlert
          key={"MyAlert1_" + url}
          id={"MyAlert1_" + url}
          text="The url path has been copied to your clipboard."
          isOpen={isCopyLinkMessageOpen}
          setIsOpen={setIsCopyLinkMessageOpen}
        />
      </div>
    );
  };

  const HeaderBigImageContentLeft = (e) => {
    return (
      <>
        <Link style={{ textDecoration: "none" }} href={"/" + url}>
          <span
            key={"span1_" + url}
            id={"span1_" + url}
            className={styles.CardHeaderTitleStyle}
            onClick={() => goToArticlePageAction()}
          >
            {title}
          </span>
        </Link>

        <br />
      </>
    );
  };

  const HeaderBigImageContentRight = (e) => {
    return (
      <div className={styles.CardHeaderRightStyle}>
        <IconButton
          style={{ padding: "0px" }}
          key={"iconButton1_" + url}
          id={"iconButton1_" + url}
          aria-label="share"
          onClick={copylink}
        >
          <ShareIcon />
        </IconButton>
        <MyAlert
          key={"MyAlert1_" + url}
          id={"MyAlert1_" + url}
          text="The url path has been copied to your clipboard."
          isOpen={isCopyLinkMessageOpen}
          setIsOpen={setIsCopyLinkMessageOpen}
        />
      </div>
    );
  };

  const BodyLeftContent = () => {
    return (
      <div
        key={"div1_" + url}
        id={"div1_" + url}
        className={
          activeIsSmallCardStyle
            ? styles.SmallBodyLeftContentStyle
            : styles.BodyLeftContentStyle
        }
        dangerouslySetInnerHTML={{ __html: body }}
        onClick={() => goToArticlePageAction()}
      ></div>
    );
  };

  const BodyRightContent = () => {
    return (
      <>
        <div
          key={"div2_" + url}
          id={"div2_" + url}
          className={styles.BodyRightContentStyle}
        >
          {title_image && (
            <Image
              key={"image_" + url}
              id={"image_" + url}
              alt={"img_" + url}
              onClick={() => goToArticlePageAction()}
              src={title_image}
              fill
              style={{ float: "right", objectFit: "contain" }}
            />
          )}
        </div>
      </>
    );
  };

  const tagSelectedAction = (topic) => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      router.push("/?search=" + topic);
      setIsLoading(false);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  };

  // useEffect(() => {
  //   setIsLoading(true);

  //   setIsLoading(false);
  // }, []);

  const StandardCardDesign = () => {
    return (
      <Card
        elevation={3}
        className={
          activeIsManyCardsInRow ? styles.CardManyStyle : styles.CardStyle
        }
        id={"card" + url}
        key={"card" + url}
      >
        <div
          className={styles.HeaderContent}
          key={"div30_" + url}
          id={"div30_" + url}
        >
          <MyGrid
            leftContent={<HeaderLeftContent />}
            rightContent={<HeaderRightContent />}
            isStaticWidth
            isRightContentSmall
          ></MyGrid>
        </div>
        <div
          className={styles.BodyContent}
          key={"div4_" + url}
          id={"div4_" + url}
        >
          <MyGrid
            leftContent={<BodyLeftContent />}
            rightContent={<BodyRightContent />}
            isStaticWidth
            isRightContentSmall
          ></MyGrid>
        </div>
        <div
          className={styles.TopicListStyle}
          key={"div5_" + url}
          id={"div5_" + url}
        >
          {topics?.map(
            (topic) =>
              topic && (
                <button
                  key={"ChipCardItem" + topic}
                  className={styles.TopicChipStyle}
                  onClick={() => tagSelectedAction(topic)}
                >
                  {topic}
                </button>
              )
          )}
          <Backdrop
            key={"Backdrop1_" + url}
            id={"Backdrop1_" + url}
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={isLoading}
          >
            <CircularProgress
              key={"CircularProgress1_" + url}
              id={"CircularProgress1_" + url}
              color="inherit"
            />
          </Backdrop>
        </div>
      </Card>
    );
  };

  const BigImageCardDesign = () => {
    return (
      <Card
        sx={{ maxWidth: 345 }}
        elevation={3}
        className={
          activeIsManyCardsInRow ? styles.CardManyStyle : styles.CardStyle
        }
        id={"card" + url}
        key={"card" + url}
      >
        <div
          className={styles.HeaderContentBigImage}
          key={"div31_" + url}
          id={"div31_" + url}
        >
          <CardMedia
            onClick={() => goToArticlePageAction()}
            component="img"
            height="140"
            style={{ cursor: "pointer" }}
            image={title_image}
            alt="green iguana"
          />
        </div>
        <div
          className={styles.BodyContentBigImage}
          key={"div32_" + url}
          id={"div32_" + url}
        >
          <CardContent>
            <MyGrid
              leftContent={<HeaderBigImageContentLeft />}
              rightContent={<HeaderBigImageContentRight />}
              isStaticWidth
              isRightContentSmall
            ></MyGrid>

            {/* <Typography variant="body2" color="text.secondary"> */}
            <BodyLeftContent />
            {/* </Typography> */}
          </CardContent>
        </div>
      </Card>
    );
  };

  return (
    <>
      <LoadingFullPage isLoading={isLoading} />
      {specialFields && !specialFields?.is_card_design_with_big_image && (
        <StandardCardDesign />
      )}

      {specialFields && specialFields?.is_card_design_with_big_image && (
        <BigImageCardDesign />
      )}
    </>
  );
};

export default CardItem;
