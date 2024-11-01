"use client";
import React, { useEffect, useState } from "react";
import Header from "../../../components/mainComponents/Header";
import NavbarAdminPanel from "../../../pages/components/NavbarAdminPanel";
import {
  Button,
  Container,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import LoadingFullPage from "../../../components/reusableComponents/LoadingFullPage";
import MyAlert from "../../../components/reusableComponents/MyAlert";
import useLanguages from "../../../hooks/useLanguages";
import { useRouter } from "next/navigation";
import S3UploadForm from "../../../components/pageComponents/S3UploadForm";
import TagList from "../../../components/TagList";
import Image from "next/image";
import styles from "../../AdminPanel/AdminPanel.module.scss";
import { set } from "date-fns";

const AdminPanel = () => {
  const router = useRouter();
  const [isNewOrUpdate, setIsNewOrUpdate] = useState("new");
  const [isSuperAuthorizedUser, setIsSuperAuthorizedUser] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const LABELS = useLanguages();
  const [isAuthorizedUser, setIsAuthorizedUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [isRefreshingTagList, setIsRefreshingTagList] = useState(true);
  const [isMain, setIsMain] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);
  const [name, setName] = useState("");
  const [tagImageUrl, setTagImageUrl] = useState("");

  function isEmailInList(email, emailListString) {
    // E-posta listesini virgül ile ayır ve diziye dönüştür
    const emailArray = emailListString.split(",");

    // E-posta adresinin listede olup olmadığını kontrol et
    return emailArray.includes(email);
  }

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
    if (selectedTag) {
      fillAllFields(selectedTag);
    }
  }, [selectedTag]);

  const fillAllFields = (myTag) => {
    setTagImageUrl(myTag?.image);
    setName(myTag?.name);
    setOrderNumber(myTag?.order_number);
    setIsMain(myTag?.is_main);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    if (!name) {
      setShowError(true);
      setErrorMessage(LABELS.TITLE_IS_REQUIRED);
      setIsLoading(false);
      return;
    } else {
      try {
        if (isNewOrUpdate === "update") {
          fetch("/api/topic/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: name,
              is_main: isMain,
              image: tagImageUrl,
              order_number: orderNumber,
              id: selectedTag?.id,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              clearAllFields();
            });
        } else {
          fetch("/api/topic/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: name,
              is_main: isMain,
              image: tagImageUrl,
              order_number: orderNumber,
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

  const clearAllFields = () => {
    setTagImageUrl("");
    setName("");
    setOrderNumber(0);
    setIsMain(false);
    setSelectedTag("");
    setIsRefreshingTagList(true);
    setIsMessageOpen(true);
  };

  const handleChangeNewOrUpdate = (event, newValue) => {
    setIsNewOrUpdate(newValue);
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
              <h3 style={{ textAlign: "center" }}>{LABELS.SUBJECT}</h3>
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
                <Grid item xs={12} sm={12} style={{ marginTop: "20px" }}>
                  <TagList
                    selectedTag={selectedTag}
                    setSelectedTag={setSelectedTag}
                    isRefreshingTagList={isRefreshingTagList}
                    setIsRefreshingTagList={setIsRefreshingTagList}
                  />
                  {/* <>
                    <br />
                    <span>{topicListInfo}</span>
                  </> */}
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                <TextField
                  style={{ width: "100%", marginTop: "20px" }}
                  label={LABELS.NAME}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="number"
                  style={{ width: "100%", marginTop: "20px" }}
                  label={LABELS.ORDER_NUMBER}
                  value={orderNumber}
                  onChange={(event) => setOrderNumber(event.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                style={{
                  width: "100%",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={isMain}
                      onChange={(event) => setIsMain(event?.target?.checked)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label={LABELS.IS_MAIN_TOPIC}
                />
                <Button
                  variant="contained"
                  type="submit"
                  onClick={() => onSubmit()}
                  color="success"
                  style={{ float: "right", marginTop: "20px" }}
                >
                  {LABELS.SAVE}
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <S3UploadForm
                  titleImageUrl={tagImageUrl}
                  setTitleImageUrl={setTagImageUrl}
                  setIsLoading={setIsLoading}
                  folderPath="topic"
                />
                {/* <div className={styles.ImageContainerStyle}>
                  <div className={styles.ImageContainerStyle}>
                    {tagImageUrl && (
                      <Image
                        src={tagImageUrl}
                        fill={true}
                        objectFit="contain"
                        alt={tagImageUrl}
                      />
                    )}
                  </div>
                </div> */}
              </Grid>
            </Container>
            {/* <Errors /> */}
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
        )}
      </>
    </div>
  );
};

export default AdminPanel;
