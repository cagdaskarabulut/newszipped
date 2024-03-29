"use client";
// import { useQuill } from "react-quilljs";
const { useQuill } = require("react-quilljs");
// import dynamic from "next/dynamic";
// const ReactQuill = dynamic(import('react-quill'), { ssr: false , loading: () => <p>Loading ...</p>})
import React, { useEffect, useState } from "react";
import TopicList from "../../components/TopicList";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import {
  getStringWithCommaSeperatedFromList,
  replaceStringForUrlFormat,
} from "../../utils/StringUtils";
import MyQuillEditor from "../../components/reusableComponents/MyQuillEditor";
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
import MyGrid from "../../components/toolComponents/MyGrid";
import Image from "next/image";
import S3UploadForm from "../../components/pageComponents/S3UploadForm";
import MyAlert from "../../components/reusableComponents/MyAlert";
import styles from "./AdminPanel.module.scss";
import LoadingFullPage from "../../components/reusableComponents/LoadingFullPage";

const AdminPanel = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [titleImageUrl, setTitleImageUrl] = useState("");
  const { quill, quillRef } = useQuill();
  const [topicList, setTopicList] = useState([]);
  const [isManuelPage, setIsManuelPage] = useState(false);
  const [description, setDescription] = useState("");
  const [metaKeys, setMetaKeys] = useState("");
  const [generateImageByRobotText, setGenerateImageByRobotText] = useState("");
  const [attributes, setAttributes] = useState();
  const [imagePath, setImagePath] = useState();
  const [error, setError] = useState(false);
  const [selectedOldPathForCopyFrom, setSelectedOldPathForCopyFrom] =
    useState("");
  const [isAuthorizedUser, setIsAuthorizedUser] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");
  const [isRefreshingTopicList, setIsRefreshingTopicList] = useState(true);

  const handleClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    fetch("/api/auth/whoAmI/email")
      .then((res) => res.json())
      .then((data) => {
        setIsAuthorizedUser(false);
        if (data.email !== process.env.NEXT_PUBLIC_ADMIN_USER) {
          router.push("/api/auth/signin", { scroll: false });
        } else {
          setIsAuthorizedUser(true);
        }
      });
  }, []);

  async function handleGenerateImageWithRobot() {
    setIsLoading(true);
    setAttributes(undefined);
    setImagePath(undefined);
    setError(undefined);

    try {
      await fetch("/api/image", {
        method: "POST",
        body: JSON.stringify({
          description: `${generateImageByRobotText} (use white background. Never type any word)`,
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
      setErrorMessage("Title is required");
    }
  }

  const handleIsManuelChange = (event) => {
    setIsManuelPage(event?.target?.checked);
  };

  const Errors = () => {
    return (
      <>
        <MyAlert
          text="Page is successfully saved"
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

  async function handleGenerateTextFieldsWithRobot() {
    setIsLoading(true);
    try {
      await fetch("/api/chat-gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Prepare a long article about "${title}". Write in English and have at least 1000 words. Return with html tags in div format without style.`,
        }),
      })
        .then((res) => res.json())
        .then((resData) => {
          let response = Object.values(resData.choices);
          let onlyFirstResponse = response[0]?.message?.content;
          // setResult(onlyFirstResponse);
          quill.clipboard.dangerouslyPasteHTML(onlyFirstResponse);
          setUrl(replaceStringForUrlFormat(title));
          setIsManuelPage(false);

          fetch("/api/chat-gpt-metatags", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: `Generate meta keywords tag content for "${title}" webpage and return the content in english and as a content string only`,
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
                  prompt: `Generate meta description tag content for "${title}" webpage and return the content in english and as a content string only`,
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
      setErrorMessage("İçerik üretilirken hata oluştu");
    }
  }

  const AddTopicAction = async () => {
    setIsLoading(true);
    if (!newTopicName) {
      setShowError(true);
      setErrorMessage("Title is required");
      return;
    }
    try {
      fetch("/api/topic/add", {
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
          setTopicList(null);
          setOpenDialog(false);
          setIsLoading(false);
        });
    } catch (error) {
      setErrorMessage("Title is required");
      setIsLoading(false);
    }
  };

  const onSubmit = async () => {
    setIsLoading(true);
    if (!title) {
      setShowError(true);
      setErrorMessage("Title is required");
      return;
    } else if (!titleImageUrl) {
      setShowError(true);
      setIsLoading(false);
      setErrorMessage("Resim eklenmesi zorunludur");
      return;
    }
    try {
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
          body: quill.container.firstChild.innerHTML,
          is_manuel_page: isManuelPage,
          description: description,
          meta_keys: metaKeys,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setUrl("");
          setTitle("");
          setTopicList("");
          quill.setText("");
          setIsManuelPage(false);
          setDescription("");
          setMetaKeys("");
          setIsMessageOpen(true);
          setGenerateImageByRobotText("");
          setImagePath("");
          setTopicList("");
          setTitleImageUrl("");
          setIsLoading(false);
        });
    } catch (error) {
      setErrorMessage("Title is required");
      setIsLoading(false);
    }
  };

  return (
    <>
      {isAuthorizedUser && (
        <>
          <LoadingFullPage isLoading={isLoading} />
          <Container maxWidth="md">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <h1>Yeni Sayfa Girişi</h1>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  className={styles.TextFieldStyle}
                  id="standard-basic"
                  label="Title"
                  value={title}
                  onChange={(event) => handleTitleChange(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  type="submit"
                  onClick={async () => handleGenerateTextFieldsWithRobot()}
                  disabled={process.env.IS_LOCAL == "false"}
                >
                  Robot ile metinleri doldur
                </Button>
              </Grid>
              <Divider className={styles.DividerStyle} />
              <Grid item xs={12} sm={6}>
                <TextField
                  multiline
                  style={{ width: "100%" }}
                  id="standard-basic"
                  label="Robot'un ne konuda resim üretmesini istersiniz?"
                  value={generateImageByRobotText}
                  onChange={(event) =>
                    setGenerateImageByRobotText(event.target.value)
                  }
                  disabled={process.env.IS_LOCAL == "false"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  type="submit"
                  onClick={async () => handleGenerateImageWithRobot()}
                  disabled={process.env.IS_LOCAL == "false"}
                >
                  Robot ile resim üret
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
                {imagePath}
              </Grid>
              <Grid item xs={12} sm={6}>
                <S3UploadForm
                  titleImageUrl={titleImageUrl}
                  setTitleImageUrl={setTitleImageUrl}
                  setIsLoading={setIsLoading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <span style={{ color: "red" }}>
                  *** Robot tarafından üretilen resmi; önce bilgisayarınıza
                  indirip sonra siteye upload etmeniz gerekmektedir.
                </span>
              </Grid>

              <Divider className={styles.DividerStyle} />
              <Grid item xs={12} sm={6}>
                <TextField
                  className={styles.TextFieldStyle}
                  id="standard-basic"
                  label="Meta Keys"
                  value={metaKeys}
                  onChange={(event) => setMetaKeys(event.target.value)}
                />
              </Grid>
              <Grid item xs={10} sm={5}>
                <TopicList topicList={topicList} setTopicList={setTopicList} 
                isRefreshingTopicList={isRefreshingTopicList}
                setIsRefreshingTopicList={setIsRefreshingTopicList} />
              </Grid>
              <Grid item xs={2} sm={1}>
                <IconButton
                  aria-label="delete"
                  size="large"
                  onClick={() => setOpenDialog(true)}
                >
                  <AddCircleIcon fontSize="inherit" color="primary" />
                </IconButton>
              </Grid>
              <Divider className={styles.DividerStyle} />
              <Grid item xs={12} sm={6}>
                <TextField
                  className={styles.TextFieldStyle}
                  id="standard-basic"
                  label="Url"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  className={styles.TextFieldStyle}
                  id="standard-basic"
                  label="Description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Grid>
              <Divider className={styles.DividerStyle} />
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isManuelPage}
                      onChange={handleIsManuelChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Is Manually Created"
                />
              </Grid>
              <Divider className={styles.DividerStyle} />
              <Grid item xs={12} sm={12}>
                <MyGrid
                  isOneFullContent
                  leftContent={
                    <MyQuillEditor
                      quill={quill}
                      quillRef={quillRef}
                      activeStyle={{
                        width: "100%",
                        height: "75vh",
                        marginTop: "4px",
                      }}
                    />
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <div style={{ paddingTop: "30px", paddingBottom: "60px" }}>
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={() => onSubmit()}
                    color="success"
                  >
                    Save
                  </Button>
                </div>
              </Grid>
            </Grid>
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
                <div style={{ width: "90%",float: "left" }}>
                  <TextField
                    className={styles.TextFieldStyle}
                    label="Enter new topic name"
                    value={newTopicName}
                    onChange={(event) => setNewTopicName(event.target.value)}
                  />
                </div>
                <div style={{ width: "10%",float: "right" }}>
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
  );
};

export default AdminPanel;
