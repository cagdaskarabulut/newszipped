import * as React from "react";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import { Chip } from "@mui/material";
import styles from "./CardItem.module.scss";
import MyAlert from "./MyAlert";
import MyGrid from "../toolComponents/MyGrid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { format } from "date-fns";

const CardItem = ({
  url,
  title,
  topics,
  create_date,
  like_number,
  body,
  title_image,
  is_manuel_page,
}) => {
  const router = useRouter();
  const [isCopyLinkMessageOpen, setIsCopyLinkMessageOpen] = useState(false);

  async function goToArticlePageAction() {
    router.push("/" + url);
  }

  const copylink = (e) => {
    navigator.clipboard.writeText("https://www.newszipped.com/" + url);
    setIsCopyLinkMessageOpen(true);
  };

  const HeaderLeftContent = (e) => {
    return (
      <>
        <span
          className={styles.CardHeaderTitleStyle}
          onClick={() => goToArticlePageAction()}
        >
          {title}
        </span>
        <span
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
        <IconButton aria-label="share" onClick={copylink}>
          <ShareIcon />
        </IconButton>
        <MyAlert
          text="The url path has been copied to your clipboard."
          isOpen={isCopyLinkMessageOpen}
          setIsOpen={setIsCopyLinkMessageOpen}
        />
      </div>
    );
  };

  const BodyLeftContent = () => {
    return (
      <>
        <div
          className={styles.BodyLeftContentStyle}
          dangerouslySetInnerHTML={{ __html: body }}
          onClick={() => goToArticlePageAction()}
        ></div>
      </>
    );
  };

  const BodyRightContent = () => {
    return (
      <>
        <div className={styles.BodyRightContentStyle}>
          {title_image && (
            <Image
              onClick={() => goToArticlePageAction()}
              src={title_image}
              key={"image_" + url}
              objectFit="contain"
              width={100}
              height={100}
              style={{ float: "right" }}
            />
          )}
        </div>
      </>
    );
  };

  return (
    <Card elevation={3} className={styles.CardStyle}>
      <div className={styles.HeaderContent}>
        <MyGrid
          leftContent={<HeaderLeftContent />}
          rightContent={<HeaderRightContent />}
          isStaticWidth
          isRightContentSmall
        ></MyGrid>
      </div>
      <div className={styles.BodyContent}>
        <MyGrid
          leftContent={<BodyLeftContent />}
          rightContent={<BodyRightContent />}
          isStaticWidth
          isRightContentSmall
        ></MyGrid>
      </div>
      <div className={styles.TopicListStyle}>
        {topics?.map((topic) => (
          <Chip
            className={styles.TopicChipStyle}
            label={topic}
            size="small"
            onClick={() => console.log("chip tıklandı")}
          />
        ))}
      </div>
    </Card>
  );
};

export default CardItem;
