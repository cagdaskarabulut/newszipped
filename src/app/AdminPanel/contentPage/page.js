"use client";
// import { useQuill } from "react-quilljs";
const { useQuill } = require("react-quilljs");
// import dynamic from "next/dynamic";
// const ReactQuill = dynamic(import('react-quill'), { ssr: false , loading: () => <p>Loading ...</p>})
import React, { useEffect, useState } from "react";
import TopicList from "../../../components/TopicList";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import useLanguages from "../../../hooks/useLanguages";
import {
  getListFromStringWithCommaSeperated,
  getStringWithCommaSeperatedFromList,
  replaceStringForUrlFormat,
} from "../../../utils/StringUtils";
import MyQuillEditor from "../../../components/reusableComponents/MyQuillEditor";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import MyGrid from "../../../components/toolComponents/MyGrid";
import Image from "next/image";
import S3UploadForm from "../../../components/pageComponents/S3UploadForm";
import styles from "../AdminPanel.module.scss";
import LoadingFullPage from "../../../components/reusableComponents/LoadingFullPage";
import UrlList from "../../../components/UrlList";
import Header from "../../../components/mainComponents/Header";
import FooterPanel from "../../../components/mainComponents/FooterPanel";
import NavbarAdminPanel from "../../../pages/components/NavbarAdminPanel";
import MyAlert from "../../../components/reusableComponents/MyAlert";

const AdminPanel = () => {
  const LABELS = useLanguages();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("");
  const [bannerOrderNumber, setBannerOrderNumber] = useState(0);
  const [url, setUrl] = useState("");
  const [titleImageUrl, setTitleImageUrl] = useState("");
  const { quill, quillRef } = useQuill();
  const [isManuelPage, setIsManuelPage] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [description, setDescription] = useState("");
  const [videoPath, setVideoPath] = useState("");
  const [metaKeys, setMetaKeys] = useState("");
  const [generateImageByRobotText, setGenerateImageByRobotText] = useState("");
  const [attributes, setAttributes] = useState();
  const [imagePath, setImagePath] = useState();
  const [error, setError] = useState(false);
  const [isNewOrUpdate, setIsNewOrUpdate] = useState("new");
  const [selectedOldPathForCopyFrom, setSelectedOldPathForCopyFrom] =
    useState("");
  const [isAuthorizedUser, setIsAuthorizedUser] = useState(false);
  const [isSuperAuthorizedUser, setIsSuperAuthorizedUser] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");
  const [topicList, setTopicList] = useState([]);
  const [topicListInfo, setTopicListInfo] = useState("");
  const [isRefreshingTopicList, setIsRefreshingTopicList] = useState(true);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [isRefreshingUrlList, setIsRefreshingUrlList] = useState(true);
  const [article, setArticle] = useState(null);
  const [isShowInBanner, setIsShowInBanner] = useState(false);
  const [isBannerFitStyle, setIsBannerFitStyle] = useState(false);
  const [isBannerStretchStyle, setIsBannerStretchStyle] = useState(false);

  function isEmailInList(email, emailListString) {
    // E-posta listesini virgül ile ayır ve diziye dönüştür
    const emailArray = emailListString.split(",");

    // E-posta adresinin listede olup olmadığını kontrol et
    return emailArray.includes(email);
  }

  const isNewOrReadyToUpdate = () => {
    if (
      isNewOrUpdate === "new" ||
      (isNewOrUpdate === "update" && selectedUrl.length > 0)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  useEffect(() => {
    fetch("/api/auth/whoAmI/email")
      .then((res) => res.json())
      .then((data) => {
        if (isEmailInList(data.email, process.env.PROJECT_SUPER_ADMIN_USER)) {
          setIsSuperAuthorizedUser(true);
          setIsAuthorizedUser(true);
        } else if (isEmailInList(data.email, process.env.PROJECT_ADMIN_USER)) {
          setIsAuthorizedUser(true);
          setIsSuperAuthorizedUser(false);
        } else {
          setIsAuthorizedUser(false);
          setIsSuperAuthorizedUser(false);
          router.push("/api/auth/signin", { scroll: false });
        }
      });
  }, []);

  useEffect(() => {
    if (article) {
      fillAllFields(article);
    }
  }, [article]);

  async function handleGenerateImageWithRobot() {
    setIsLoading(true);
    setAttributes(undefined);
    setImagePath(undefined);
    setError(undefined);

    try {
      await fetch("/api/image", {
        method: "POST",
        body: JSON.stringify({
          description: `${generateImageByRobotText} ${LABELS.USE_WHITE_BACKGROUND_NEVER_TYPE_ANY_WORD}`,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((x) => {
          setImagePath(x.image.url);
          setIsLoading(false);
          return x.image.url;
        });
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(LABELS.TITLE_IS_REQUIRED);
    }
  }

  const handleIsManuelChange = (event) => {
    setIsManuelPage(event?.target?.checked);
  };

  const handleIsActiveChange = (event) => {
    setIsActive(event?.target?.checked);
  };

  const handleChangeNewOrUpdate = (event, newValue) => {
    setIsNewOrUpdate(newValue);
  };

  const Errors = () => {
    return (
      <>
        <MyAlert
          text={LABELS.PAGE_IS_SUCCESFULLY_SAVED}
          isOpen={isMessageOpen}
          setIsOpen={setIsMessageOpen}
        />
        <MyAlert
          text={errorMessage}
          isOpen={showError}
          setIsOpen={setShowError}
          severity="error"
        />
      </>
    );
  };

  function handleTitleChange(value) {
    setTitle(value);
    setUrl(replaceStringForUrlFormat(value));
    setGenerateImageByRobotText(
      `Generate image of "${value}" (use white background. do not use any character on image)`
    );
  }

  function handleBannerOrderNumberChange(value) {
    setBannerOrderNumber(value);
  }

  async function handleGenerateTextFieldsWithRobot() {
    setIsLoading(true);
    try {
      await fetch("/api/chat-gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Prepare a long article about "${title}". Write in ${LABELS.ACTIVE_LANGUAGE} and have at least 1000 words. Return with html tags in div format without style.`,
        }),
      })
        .then((res) => res.json())
        .then((resData) => {
          let response = Object.values(resData.choices);
          let onlyFirstResponse = response[0]?.message?.content;
          quill.clipboard.dangerouslyPasteHTML(onlyFirstResponse);
          setUrl(replaceStringForUrlFormat(title));
          setIsManuelPage(false);
          fetch("/api/chat-gpt-metatags", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: `Generate meta keywords tag content for "${title}" webpage and return the content in ${LABELS.ACTIVE_LANGUAGE} and as a content string only`,
            }),
          })
            .then((res) => res.json())
            .then((resDataKeywords) => {
              let responseK = Object.values(resDataKeywords.choices);
              let onlyFirstResponseK = responseK[0]?.message?.content;
              onlyFirstResponseK = onlyFirstResponseK.replace(/"/g, "");
              setMetaKeys(onlyFirstResponseK);

              fetch("/api/chat-gpt-metatags", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  prompt: `Generate meta description tag content for "${title}" webpage and return the content in ${LABELS.ACTIVE_LANGUAGE} and as a content string only`,
                }),
              })
                .then((resD) => resD.json())
                .then((resDataD) => {
                  let responseDescription = Object.values(resDataD.choices);
                  let descriptionString =
                    responseDescription[0]?.message?.content;
                  descriptionString = descriptionString.replace(/"/g, "");
                  setDescription(descriptionString);
                  setIsLoading(false);
                });
            });
        });
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(LABELS.AN_ERROR_OCCURED_WHILE_GENERATING_CONTENT);
    }
  }

  const AddTopicAction = async () => {
    setIsLoading(true);
    if (!newTopicName) {
      setShowError(true);
      setErrorMessage(LABELS.TITLE_IS_REQUIRED);
      return;
    }
    try {
      fetch("/api/topic/addSimple", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newTopicName,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setNewTopicName("");
          setIsRefreshingTopicList(true);
          setTopicList([]);
          setIsRefreshingUrlList(true);
          setSelectedUrl("");
          setOpenDialog(false);
          setIsLoading(false);
        });
    } catch (error) {
      setErrorMessage(LABELS.TITLE_IS_REQUIRED);
      setIsLoading(false);
    }
  };

  const clearAllFields = () => {
    setSelectedUrl("");
    setIsRefreshingUrlList(true);
    setUrl("");
    setTitle("");
    setTopicList([]);
    setTopicListInfo("");
    quill.setText("");
    setIsManuelPage(false);
    setDescription("");
    setMetaKeys("");
    setIsMessageOpen(true);
    setGenerateImageByRobotText("");
    setImagePath("");
    setTitleImageUrl("");
    setVideoPath("");
    setIsLoading(false);
    setIsActive(true);
    setIsShowInBanner(false);
    setIsBannerFitStyle(false);
    setIsBannerStretchStyle(false);
  };

  const fillAllFields = (myArticle) => {
    setUrl(myArticle.url);
    setTitle(myArticle.title);
    setTitleImageUrl(myArticle.title_image);
    setVideoPath(myArticle.video_path);

    const topicsArray = getListFromStringWithCommaSeperated(
      myArticle.topics
    ).map((topic) => ({ name: topic }));
    setTopicList(topicsArray);

    quill.clipboard.dangerouslyPasteHTML(myArticle.body);
    setIsManuelPage(myArticle.is_manuel_page);
    setDescription(myArticle.description);
    setMetaKeys(myArticle.meta_keys);
    setIsActive(myArticle.is_active);
    setIsShowInBanner(myArticle.is_show_in_banner);
    setIsBannerFitStyle(myArticle.is_banner_fit_style);
    setIsBannerStretchStyle(myArticle.is_banner_stretch_style);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    if (!title) {
      setShowError(true);
      setErrorMessage(LABELS.TITLE_IS_REQUIRED);
      setIsLoading(false);
      return;
    } else if (!titleImageUrl) {
      setShowError(true);
      setErrorMessage(LABELS.IMAGE_IS_REQUIRED);
      setIsLoading(false);
      return;
    } else {
      try {
        if (isNewOrUpdate === "update") {
          fetch("/api/article/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              url: selectedUrl,
              title: title,
              topics: getStringWithCommaSeperatedFromList(topicList),
              create_date: new Date(),
              title_image: titleImageUrl,
              video_path: videoPath,
              body: quill.container.firstChild.innerHTML,
              is_manuel_page: isManuelPage,
              description: description,
              meta_keys: metaKeys,
              is_active: isActive,
              is_show_in_banner: isShowInBanner,
              is_banner_fit_style: isBannerFitStyle,
              is_banner_stretch_style: isBannerStretchStyle,
              is_show_in_menu: false,
              page_name: "",
              is_core_page: false,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              clearAllFields();
            });
        } else {
          fetch("/api/article/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              url:
                replaceStringForUrlFormat(url) +
                "-" +
                Math.floor(Math.random() * 1000000000000),
              title: title,
              topics: getStringWithCommaSeperatedFromList(topicList),
              create_date: new Date(),
              title_image: titleImageUrl,
              video_path: videoPath,
              body: quill.container.firstChild.innerHTML,
              is_manuel_page: isManuelPage,
              description: description,
              meta_keys: metaKeys,
              is_active: isActive,
              is_show_in_banner: isShowInBanner,
              is_banner_fit_style: isBannerFitStyle,
              is_banner_stretch_style: isBannerStretchStyle,
              is_show_in_menu: false,
              page_name: "",
              is_core_page: false,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              clearAllFields();
            });
        }
      } catch (error) {
        setErrorMessage(LABELS.TITLE_IS_REQUIRED);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={styles.AdminPanelContainerStyle}>
      <Header />
      {/* <Header specialFields={specialFields} /> */}

      <>
        {isAuthorizedUser && (
          <>
            <LoadingFullPage isLoading={isLoading} />
            <NavbarAdminPanel />
            <Container maxWidth="md" className={styles.ContainerStyle}>
              <h3 style={{ textAlign: "center" }}>
                {LABELS.CREATE_UPDATE_CONTENT_PAGE}
              </h3>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <ToggleButtonGroup
                    color="primary"
                    value={isNewOrUpdate}
                    exclusive
                    onChange={handleChangeNewOrUpdate}
                    aria-label="Platform"
                  >
                    <ToggleButton value="new">{LABELS.CREATE}</ToggleButton>
                    <ToggleButton value="update">{LABELS.UPDATE}</ToggleButton>
                  </ToggleButtonGroup>
                </Grid>

                {isNewOrUpdate == "update" && (
                  <>
                    <Grid item xs={12} sm={12}>
                      <UrlList
                        isDisabled
                        isSingleSelection
                        setArticle={setArticle}
                        selectedUrl={selectedUrl}
                        setSelectedUrl={setSelectedUrl}
                        isRefreshingUrlList={isRefreshingUrlList}
                        setIsRefreshingUrlList={setIsRefreshingUrlList}
                      />
                    </Grid>
                  </>
                )}

                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={
                    isNewOrReadyToUpdate()
                      ? { display: "" }
                      : { display: "none" }
                  }
                >
                  <TextField
                    className={styles.TextFieldStyle}
                    id="standard-basic"
                    label="Title"
                    value={title}
                    onChange={(event) => handleTitleChange(event.target.value)}
                  />
                </Grid>
                {isSuperAuthorizedUser && (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={
                      isNewOrReadyToUpdate()
                        ? { display: "" }
                        : { display: "none" }
                    }
                  >
                    <Button
                      variant="contained"
                      type="submit"
                      onClick={async () => handleGenerateTextFieldsWithRobot()}
                      disabled={process.env.IS_LOCAL == "false"}
                    >
                      {LABELS.FILL_TEXT_FIELDS_WITH_ROBOT}
                    </Button>
                  </Grid>
                )}
                <Divider
                  className={styles.DividerStyle}
                  style={
                    isNewOrReadyToUpdate()
                      ? { display: "" }
                      : { display: "none" }
                  }
                />
                <Grid
                  item
                  xs={12}
                  sm={3}
                  style={
                    isNewOrReadyToUpdate()
                      ? { display: "" }
                      : { display: "none" }
                  }
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isShowInBanner}
                        onChange={(event) =>
                          setIsShowInBanner(event?.target?.checked)
                        }
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label={LABELS.SHOW_IN_BANNER}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={3}
                  style={
                    isNewOrReadyToUpdate()
                      ? { display: "" }
                      : { display: "none" }
                  }
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isBannerFitStyle}
                        onChange={(event) =>
                          setIsBannerFitStyle(event?.target?.checked)
                        }
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label={LABELS.IS_BANNER_FIT_STYLE}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={3}
                  style={
                    isNewOrReadyToUpdate()
                      ? { display: "" }
                      : { display: "none" }
                  }
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isBannerStretchStyle}
                        onChange={(event) =>
                          setIsBannerStretchStyle(event?.target?.checked)
                        }
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label={LABELS.IS_BANNER_STRETCH_STYLE}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={3}
                  style={
                    isNewOrReadyToUpdate()
                      ? { display: "" }
                      : { display: "none" }
                  }
                >
                  <TextField
                    type="number"
                    className={styles.TextFieldStyle}
                    id="standard-basic"
                    label={LABELS.BANNER_ORDER_NUMBER}
                    value={bannerOrderNumber}
                    onChange={(event) =>
                      handleBannerOrderNumberChange(event.target.value)
                    }
                  />
                </Grid>
                <Divider
                  className={styles.DividerStyle}
                  style={
                    isNewOrReadyToUpdate()
                      ? { display: "" }
                      : { display: "none" }
                  }
                />
                <Grid
                  item
                  xs={12}
                  sm={4}
                  style={
                    isNewOrReadyToUpdate()
                      ? { display: "" }
                      : { display: "none" }
                  }
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isManuelPage}
                        onChange={handleIsManuelChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label={LABELS.IS_MANUALLY_CREATED}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  style={
                    isNewOrReadyToUpdate()
                      ? { display: "" }
                      : { display: "none" }
                  }
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isActive}
                        onChange={handleIsActiveChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label={LABELS.IS_ACTIVE}
                  />
                </Grid>
                <Divider
                  className={styles.DividerStyle}
                  style={
                    isNewOrReadyToUpdate()
                      ? { display: "" }
                      : { display: "none" }
                  }
                />
                {isSuperAuthorizedUser && (
                  <>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      style={
                        isNewOrReadyToUpdate()
                          ? { display: "" }
                          : { display: "none" }
                      }
                    >
                      <TextField
                        multiline
                        style={{ width: "100%" }}
                        id="standard-basic"
                        label={LABELS.WHAT_WOULD_YOU_LIKE_THE_ROBOT_TO_PRODUCE}
                        value={generateImageByRobotText}
                        onChange={(event) =>
                          setGenerateImageByRobotText(event.target.value)
                        }
                        disabled={process.env.IS_LOCAL == "false"}
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={6}
                      style={
                        isNewOrReadyToUpdate()
                          ? { display: "" }
                          : { display: "none" }
                      }
                    >
                      <Button
                        variant="contained"
                        type="submit"
                        onClick={async () => handleGenerateImageWithRobot()}
                        disabled={process.env.IS_LOCAL == "false"}
                      >
                        {LABELS.CREATE_A_PICTURE_WITH_ROBOT}
                      </Button>
                    </Grid>
                  </>
                )}
                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={
                    isNewOrReadyToUpdate()
                      ? { display: "" }
                      : { display: "none" }
                  }
                >
                  {imagePath && (
                    <>
                      <h3 className={styles.subTitleStyle}>Üretilen Resim</h3>
                      <div className={styles.ImageContainerStyle}>
                        <Image
                          src={imagePath}
                          fill={true}
                          objectFit="contain"
                          alt={"img_" + imagePath}
                        />
                      </div>
                    </>
                  )}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={
                    isNewOrReadyToUpdate()
                      ? { display: "" }
                      : { display: "none" }
                  }
                >
                  {imagePath}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={
                    isNewOrReadyToUpdate()
                      ? { display: "" }
                      : { display: "none" }
                  }
                >
                  <S3UploadForm
                    titleImageUrl={titleImageUrl}
                    setTitleImageUrl={setTitleImageUrl}
                    setIsLoading={setIsLoading}
                    folderPath=""
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={
                    isNewOrReadyToUpdate()
                      ? { display: "" }
                      : { display: "none" }
                  }
                >
                  <span style={{ color: "red" }}>
                    {LABELS.THE_IMAGE_PRODUCED_BY_THE_ROBOT}
                  </span>
                </Grid>

                <Divider
                  className={styles.DividerStyle}
                  style={
                    isNewOrReadyToUpdate()
                      ? { display: "" }
                      : { display: "none" }
                  }
                />

                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={
                    isNewOrReadyToUpdate()
                      ? { display: "" }
                      : { display: "none" }
                  }
                >
                  <TextField
                    className={styles.TextFieldStyle}
                    label={LABELS.YOUTUBE_VIDEO_PATH}
                    value={videoPath}
                    onChange={(event) => setVideoPath(event.target.value)}
                  />
                </Grid>

                <Divider
                  className={styles.DividerStyle}
                  style={
                    isNewOrReadyToUpdate()
                      ? { display: "" }
                      : { display: "none" }
                  }
                />
                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={
                    isNewOrReadyToUpdate()
                      ? { display: "" }
                      : { display: "none" }
                  }
                >
                  <TextField
                    className={styles.TextFieldStyle}
                    id="standard-basic"
                    label={LABELS.META_KEYS}
                    value={metaKeys}
                    onChange={(event) => setMetaKeys(event.target.value)}
                  />
                </Grid>
                <Grid
                  item
                  xs={10}
                  sm={5}
                  style={
                    isNewOrReadyToUpdate()
                      ? { display: "" }
                      : { display: "none" }
                  }
                >
                  <TopicList
                    topicList={topicList}
                    setTopicList={setTopicList}
                    isRefreshingTopicList={isRefreshingTopicList}
                    setIsRefreshingTopicList={setIsRefreshingTopicList}
                  />
                  {isNewOrUpdate === "update" && (
                    <>
                      <br />
                      <span>{topicListInfo}</span>
                    </>
                  )}
                </Grid>
                <Grid
                  item
                  xs={2}
                  sm={1}
                  style={
                    isNewOrReadyToUpdate()
                      ? { display: "" }
                      : { display: "none" }
                  }
                >
                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={() => setOpenDialog(true)}
                  >
                    <AddCircleIcon fontSize="inherit" color="primary" />
                  </IconButton>
                </Grid>
                <Divider
                  className={styles.DividerStyle}
                  style={
                    isNewOrReadyToUpdate()
                      ? { display: "" }
                      : { display: "none" }
                  }
                />
                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={
                    isNewOrReadyToUpdate()
                      ? { display: "" }
                      : { display: "none" }
                  }
                >
                  <TextField
                    className={styles.TextFieldStyle}
                    id="standard-basic"
                    label={LABELS.URL}
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={
                    isNewOrReadyToUpdate()
                      ? { display: "" }
                      : { display: "none" }
                  }
                >
                  <TextField
                    className={styles.TextFieldStyle}
                    id="standard-basic"
                    label={LABELS.DESCRIPTION}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </Grid>
                <Divider
                  className={styles.DividerStyle}
                  style={
                    isNewOrReadyToUpdate()
                      ? { display: "" }
                      : { display: "none" }
                  }
                />
                <Container
                  // style={{
                  //   paddingTop: "20px",
                  //   paddingRight: "0px",
                  //   paddingLeft: "0px",
                  // }}
                  style={
                    isNewOrReadyToUpdate()
                      ? {
                          paddingTop: "20px",
                          paddingRight: "0px",
                          paddingLeft: "24px",
                          display: "",
                        }
                      : {
                          paddingTop: "20px",
                          paddingRight: "0px",
                          paddingLeft: "24px",
                          display: "none",
                        }
                  }
                >
                  <MyQuillEditor
                    showInsertHtmlButton
                    quill={quill}
                    quillRef={quillRef}
                    activeStyle={{
                      width: "100%",
                      height: "75vh",
                      marginTop: "10px",
                    }}
                  />
                </Container>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  style={
                    isNewOrReadyToUpdate()
                      ? { display: "" }
                      : { display: "none" }
                  }
                >
                  <div style={{ paddingTop: "30px", paddingBottom: "60px" }}>
                    <Button
                      variant="contained"
                      type="submit"
                      onClick={() => onSubmit()}
                      color="success"
                      style={{ float: "right" }}
                    >
                      {LABELS.SAVE}
                    </Button>
                  </div>
                </Grid>
              </Grid>
              <br />
            </Container>
            <Dialog
              open={openDialog}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <h3 style={{ textAlign: "center" }}>Create Topic</h3>
                <div style={{ width: "400px" }}>
                  <div style={{ width: "90%", float: "left" }}>
                    <TextField
                      className={styles.TextFieldStyle}
                      label="Enter new topic name"
                      value={newTopicName}
                      onChange={(event) => setNewTopicName(event.target.value)}
                    />
                  </div>
                  <div style={{ width: "10%", float: "right" }}>
                    <IconButton
                      aria-label="delete"
                      size="large"
                      onClick={() => AddTopicAction(true)}
                    >
                      <AddCircleIcon fontSize="inherit" color="success" />
                    </IconButton>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Errors />
          </>
        )}
      </>
      <br />
      <FooterPanel />
    </div>
  );
};

export default AdminPanel;
