"use client";
import React, { useEffect, useState } from "react";
import Header from "../../../components/mainComponents/Header";
import FooterPanel from "../../../components/mainComponents/FooterPanel";
import NavbarAdminPanel from "../../../pages/components/NavbarAdminPanel";
import Divider from "@mui/material/Divider";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import styles from "../AdminPanel.module.scss";
import LoadingFullPage from "../../../components/reusableComponents/LoadingFullPage";
import MyAlert from "../../../components/reusableComponents/MyAlert";
import useLanguages from "../../../hooks/useLanguages";
import { useRouter } from "next/navigation";
import { MuiColorInput } from "mui-color-input";

const AdminPanel = () => {
  const router = useRouter();
  const LABELS = useLanguages();
  const [isSuperAuthorizedUser, setIsSuperAuthorizedUser] = useState(false);

  const [isAuthorizedUser, setIsAuthorizedUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [fontColor, setFontColor] = useState("");
  const [headerFontColor, setHeaderFontColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [headerBackgroundColor1, setHeaderBackgroundColor1] = useState("");
  const [headerBackgroundColor2, setHeaderBackgroundColor2] = useState("");
  const [bodyContentBackgroundColor1, setBodyContentBackgroundColor1] =
    useState("");
  const [bodyContentBackgroundColor2, setBodyContentBackgroundColor2] =
    useState("");
  const [footerBackgroundColor1, setFooterBackgroundColor1] = useState("");
  const [footerBackgroundColor2, setFooterBackgroundColor2] = useState("");
  const [searchBarColor, setSearchBarColor] = useState("");
  const [mainMenuSelectedFontColor, setMainMenuSelectedFontColor] =
    useState("");
  const [
    categoryMenuSelectedBackgroundColor,
    setCategoryMenuSelectedBackgroundColor,
  ] = useState("");
  const [categoryMenuSelectedFontColor, setCategoryMenuSelectedFontColor] =
    useState("");
  const [orderByMenuSelectedFontColor, setOrderByMenuSelectedFontColor] =
    useState("");
  const [tagColor, setTagColor] = useState("");
  const [commentButtonFontColor, setCommentButtonFontColor] = useState("");
  const [commentButtonBackgroundColor, setCommentButtonBackgroundColor] =
    useState("");
  const [commentButtonBorderColor, setCommentButtonBorderColor] = useState("");
  const [loginButtonFontColor, setLoginButtonFontColor] = useState("");
  const [loginButtonBackgroundColor, setLoginButtonBackgroundColor] =
    useState("");
  const [loginButtonBorderColor, setLoginButtonBorderColor] = useState("");
  const [errorColor, setErrorColor] = useState("");
  const [cautionColor, setCautionColor] = useState("");

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

    fetch("/api/article/article_project_colors")
      .then((res) => res.json())
      .then((data) => {
        setFontColor(data?.fields?.rows[0]?.fontcolor);

        setHeaderFontColor(data?.fields?.rows[0]?.headerfontcolor);
        setBackgroundColor(data?.fields?.rows[0]?.backgroundcolor);
        setHeaderBackgroundColor1(
          data?.fields?.rows[0]?.headerbackgroundcolor1
        );
        setHeaderBackgroundColor2(
          data?.fields?.rows[0]?.headerbackgroundcolor2
        );
        setBodyContentBackgroundColor1(
          data?.fields?.rows[0]?.bodycontentbackgroundcolor1
        );
        setBodyContentBackgroundColor2(
          data?.fields?.rows[0]?.bodycontentbackgroundcolor2
        );
        setFooterBackgroundColor1(
          data?.fields?.rows[0]?.footerbackgroundcolor1
        );
        setFooterBackgroundColor2(
          data?.fields?.rows[0]?.footerbackgroundcolor2
        );
        setSearchBarColor(data?.fields?.rows[0]?.searchbarcolor);
        setMainMenuSelectedFontColor(
          data?.fields?.rows[0]?.mainmenuselectedfontcolor
        );
        setCategoryMenuSelectedBackgroundColor(
          data?.fields?.rows[0]?.categorymenuselectedbackgroundcolor
        );
        setCategoryMenuSelectedFontColor(
          data?.fields?.rows[0]?.categorymenuselectedfontcolor
        );
        setOrderByMenuSelectedFontColor(
          data?.fields?.rows[0]?.orderbymenuselectedfontcolor
        );
        setTagColor(data?.fields?.rows[0]?.tagcolor);
        setCommentButtonFontColor(
          data?.fields?.rows[0]?.commentbuttonfontcolor
        );
        setCommentButtonBackgroundColor(
          data?.fields?.rows[0]?.commentbuttonbackgroundcolor
        );
        setCommentButtonBorderColor(
          data?.fields?.rows[0]?.commentbuttonbordercolor
        );
        setLoginButtonFontColor(data?.fields?.rows[0]?.loginbuttonfontcolor);
        setLoginButtonBackgroundColor(
          data?.fields?.rows[0]?.loginbuttonbackgroundcolor
        );
        setLoginButtonBorderColor(
          data?.fields?.rows[0]?.loginbuttonbordercolor
        );
        setErrorColor(data?.fields?.rows[0]?.errorcolor);
        setCautionColor(data?.fields?.rows[0]?.cautioncolor);
      });
  }, []);

  const onSubmit = async () => {
    setIsLoading(true);
    await fetch("/api/article_project_colors/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fontcolor: fontColor,
        headerfontcolor: headerFontColor,
        backgroundcolor: backgroundColor,
        headerbackgroundcolor1: headerBackgroundColor1,
        headerbackgroundcolor2: headerBackgroundColor2,
        bodycontentbackgroundcolor1: bodyContentBackgroundColor1,
        bodycontentbackgroundcolor2: bodyContentBackgroundColor2,
        footerbackgroundcolor1: footerBackgroundColor1,
        footerbackgroundcolor2: footerBackgroundColor2,
        searchbarcolor: searchBarColor,
        mainmenuselectedfontcolor: mainMenuSelectedFontColor,
        categorymenuselectedbackgroundcolor:
          categoryMenuSelectedBackgroundColor,
        categorymenuselectedfontcolor: categoryMenuSelectedFontColor,
        orderbymenuselectedfontcolor: orderByMenuSelectedFontColor,
        tagcolor: tagColor,
        commentbuttonfontcolor: commentButtonFontColor,
        commentbuttonbackgroundcolor: commentButtonBackgroundColor,
        commentbuttonbordercolor: commentButtonBorderColor,
        loginbuttonfontcolor: loginButtonFontColor,
        loginbuttonbackgroundcolor: loginButtonBackgroundColor,
        loginbuttonbordercolor: loginButtonBorderColor,
        errorcolor: errorColor,
        cautioncolor: cautionColor,
      }),
    }).then((res) => res.json());
    setIsMessageOpen(true);
    setIsLoading(false);
  };

  function isEmailInList(email, emailListString) {
    // E-posta listesini virgül ile ayır ve diziye dönüştür
    const emailArray = emailListString.split(",");

    // E-posta adresinin listede olup olmadığını kontrol et
    return emailArray.includes(email);
  }

  return (
    <>
      <Header />
      {/* <Header specialFields={specialFields} /> */}

      <>
        {isAuthorizedUser && (
          <>
            <LoadingFullPage isLoading={isLoading} />
            <NavbarAdminPanel />
            <Container maxWidth="md">
              <h3 style={{ textAlign: "center" }}>{LABELS.DESIGN}</h3>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <span>{LABELS.FONT_COLOR}</span>
                    <MuiColorInput
                      format="hex"
                      value={fontColor}
                      onChange={(newValue) => setFontColor(newValue)}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <span>{LABELS.BACKGROUND_COLOR}</span>
                    <MuiColorInput
                      format="hex"
                      value={backgroundColor}
                      onChange={(newValue) => setBackgroundColor(newValue)}
                    />
                  </Stack>
                </Grid>
              </Grid>
              <br />
              <Divider className={styles.DividerStyle} />
              <br />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <span>{LABELS.HEADER_FONT_COLOR}</span>
                    <MuiColorInput
                      format="hex"
                      value={headerFontColor}
                      onChange={(newValue) => setHeaderFontColor(newValue)}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <span>{LABELS.HEADER_BACKGROUND_COLOR_START}</span>
                    <MuiColorInput
                      format="hex"
                      value={headerBackgroundColor1}
                      onChange={(newValue) =>
                        setHeaderBackgroundColor1(newValue)
                      }
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <span>{LABELS.HEADER_BACKGROUND_COLOR_END}</span>
                    <MuiColorInput
                      format="hex"
                      value={headerBackgroundColor2}
                      onChange={(newValue) =>
                        setHeaderBackgroundColor2(newValue)
                      }
                    />
                  </Stack>
                </Grid>
              </Grid>
              <br />
              <Divider className={styles.DividerStyle} />
              <br />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <span>{LABELS.BODY_BACKGROUND_COLOR_START}</span>
                    <MuiColorInput
                      format="hex"
                      value={bodyContentBackgroundColor1}
                      onChange={(newValue) =>
                        setBodyContentBackgroundColor1(newValue)
                      }
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <span>{LABELS.BODY_BACKGROUND_COLOR_END}</span>
                    <MuiColorInput
                      format="hex"
                      value={bodyContentBackgroundColor2}
                      onChange={(newValue) =>
                        setBodyContentBackgroundColor2(newValue)
                      }
                    />
                  </Stack>
                </Grid>
              </Grid>
              <br />
              <Divider className={styles.DividerStyle} />
              <br />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <span>{LABELS.FOOTER_BACKGROUND_COLOR_START}</span>
                    <MuiColorInput
                      format="hex"
                      value={footerBackgroundColor1}
                      onChange={(newValue) =>
                        setFooterBackgroundColor1(newValue)
                      }
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <span>{LABELS.FOOTER_BACKGROUND_COLOR_END}</span>
                    <MuiColorInput
                      format="hex"
                      value={footerBackgroundColor2}
                      onChange={(newValue) =>
                        setFooterBackgroundColor2(newValue)
                      }
                    />
                  </Stack>
                </Grid>
              </Grid>
              <br />
              <Divider className={styles.DividerStyle} />
              <br />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <span>{LABELS.SEARCH_BAR_COLOR}</span>
                    <MuiColorInput
                      format="hex"
                      value={searchBarColor}
                      onChange={(newValue) => setSearchBarColor(newValue)}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <span>{LABELS.MAIN_MENU_SELECTED_FONT_COLOR}</span>
                    <MuiColorInput
                      format="hex"
                      value={mainMenuSelectedFontColor}
                      onChange={(newValue) =>
                        setMainMenuSelectedFontColor(newValue)
                      }
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <span>
                      {LABELS.CATEGORY_MENU_SELECTED_BACKGROUND_COLOR}
                    </span>
                    <MuiColorInput
                      format="hex"
                      value={categoryMenuSelectedBackgroundColor}
                      onChange={(newValue) =>
                        setCategoryMenuSelectedBackgroundColor(newValue)
                      }
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <span>{LABELS.CATEGORY_MENU_SELECTED_FONT_COLOR}</span>
                    <MuiColorInput
                      format="hex"
                      value={categoryMenuSelectedFontColor}
                      onChange={(newValue) =>
                        setCategoryMenuSelectedFontColor(newValue)
                      }
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <span>{LABELS.ORDER_BY_MENU_SELECTED_FONT_COLOR}</span>
                    <MuiColorInput
                      format="hex"
                      value={orderByMenuSelectedFontColor}
                      onChange={(newValue) =>
                        setOrderByMenuSelectedFontColor(newValue)
                      }
                    />
                  </Stack>
                </Grid>
              </Grid>
              <br />
              <Divider className={styles.DividerStyle} />
              <br />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <span>{LABELS.TAG_COLOR}</span>
                    <MuiColorInput
                      format="hex"
                      value={tagColor}
                      onChange={(newValue) => setTagColor(newValue)}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <span>{LABELS.COMMENT_BUTTON_FONT_COLOR}</span>
                    <MuiColorInput
                      format="hex"
                      value={commentButtonFontColor}
                      onChange={(newValue) =>
                        setCommentButtonFontColor(newValue)
                      }
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <span>{LABELS.COMMENT_BUTTON_BACKGROUND_COLOR}</span>
                    <MuiColorInput
                      format="hex"
                      value={commentButtonBackgroundColor}
                      onChange={(newValue) =>
                        setCommentButtonBackgroundColor(newValue)
                      }
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <span>{LABELS.COMMENT_BUTTON_BORDER_COLOR}</span>
                    <MuiColorInput
                      format="hex"
                      value={commentButtonBorderColor}
                      onChange={(newValue) =>
                        setCommentButtonBorderColor(newValue)
                      }
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <span>{LABELS.LOGIN_BUTTON_FONT_COLOR}</span>
                    <MuiColorInput
                      format="hex"
                      value={loginButtonFontColor}
                      onChange={(newValue) => setLoginButtonFontColor(newValue)}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <span>{LABELS.LOGIN_BUTTON_BACKGROUND_COLOR}</span>
                    <MuiColorInput
                      format="hex"
                      value={loginButtonBackgroundColor}
                      onChange={(newValue) =>
                        setLoginButtonBackgroundColor(newValue)
                      }
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <span>{LABELS.LOGIN_BUTTON_BORDER_COLOR}</span>
                    <MuiColorInput
                      format="hex"
                      value={loginButtonBorderColor}
                      onChange={(newValue) =>
                        setLoginButtonBorderColor(newValue)
                      }
                    />
                  </Stack>
                </Grid>
              </Grid>
              <br />
              <Divider className={styles.DividerStyle} />
              <br />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <span>{LABELS.ERROR_COLOR}</span>
                    <MuiColorInput
                      format="hex"
                      value={errorColor}
                      onChange={(newValue) => setErrorColor(newValue)}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <span>{LABELS.CAUTION_COLON}</span>
                    <MuiColorInput
                      format="hex"
                      value={cautionColor}
                      onChange={(newValue) => setCautionColor(newValue)}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={12}>
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
            </Container>
            <MyAlert
              text={LABELS.PAGE_IS_SUCCESFULLY_SAVED}
              isOpen={isMessageOpen}
              setIsOpen={setIsMessageOpen}
            />
          </>
        )}
      </>
    </>
  );
};

export default AdminPanel;
