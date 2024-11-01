"use client";
import React, { useEffect, useState } from "react";
import Header from "../../components/mainComponents/Header";
import FooterPanel from "../../components/mainComponents/FooterPanel";
import NavbarAdminPanel from "../../pages/components/NavbarAdminPanel";
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
import styles from "./AdminPanel.module.scss";
import { styled } from "@mui/material/styles";
import LoadingFullPage from "../../components/reusableComponents/LoadingFullPage";
import MyAlert from "../../components/reusableComponents/MyAlert";
import { Label } from "@mui/icons-material";
import useLanguages from "../../hooks/useLanguages";
import { useRouter } from "next/navigation";

const AdminPanel = () => {
  const router = useRouter();
  const LABELS = useLanguages() || {};
  const [isAuthorizedUser, setIsAuthorizedUser] = useState(false);
  const [isSuperAuthorizedUser, setIsSuperAuthorizedUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isProjectProductDesign, setIsProjectProductDesign] = useState(false);
  const [isCardDesignWithBigImage, setIsCardDesignWithBigImage] =
    useState(false);
  const [isOrderbyMenuActive, setIsOrderbyMenuActive] = useState(false);
  const [isTopMenuActive, setIsTopMenuActive] = useState(false);
  const [defaultLanguage, setDefaultLanguage] = useState("");
  const [mainPageName, setMainPageName] = useState("");

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.35)"
          : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));

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

    fetch("/api/article/article_project_special_fields")
      .then((res) => res.json())
      .then((data) => {
        setIsProjectProductDesign(
          data?.fields?.rows[0]?.is_project_type_product
        );
        setIsOrderbyMenuActive(data?.fields?.rows[0]?.is_order_by_menu_active);
        setIsTopMenuActive(data?.fields?.rows[0]?.is_top_menu_active);
        setMainPageName(data?.fields?.rows[0]?.main_page_name);
        setIsCardDesignWithBigImage(
          data?.fields?.rows[0]?.is_card_design_with_big_image
        );
        setDefaultLanguage(data?.fields?.rows[0]?.default_language);
      });
  }, []);

  const handleIsOrderbyMenuActive = (event) => {
    setIsOrderbyMenuActive(event?.target?.checked);
  };

  const handleIsProjectProductDesign = (event) => {
    setIsProjectProductDesign(event?.target?.checked);
  };

  const handleIsCardDesignWithBigImage = (event) => {
    setIsCardDesignWithBigImage(event?.target?.checked);
  };

  const handleIsTopMenuActive = (event) => {
    setIsTopMenuActive(event?.target?.checked);
  };

  const handleLanguageChange = (event) => {
    setDefaultLanguage(event.target.value);
  };

  function handleMainPageNameChange(value) {
    setMainPageName(value);
  }

  const onSubmit = async () => {
    setIsLoading(true);
    await fetch("/api/article_project_special_fields/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        is_project_type_article: !isProjectProductDesign,
        is_project_type_product: isProjectProductDesign,
        is_order_by_menu_active: isOrderbyMenuActive,
        is_top_menu_active: isTopMenuActive,
        main_page_name: mainPageName,
        is_card_design_with_big_image: isCardDesignWithBigImage,
        default_language: defaultLanguage,
      }),
    }).then((res) => res.json());
    setIsMessageOpen(true);
    setIsLoading(false);
  };

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
              <h3 style={{ textAlign: "center" }}>{LABELS.MAIN_SETTINGS}</h3>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <span>{LABELS.IS_ARTICLE_DESIGN}</span>
                    <AntSwitch
                      defaultChecked
                      inputProps={{ "aria-label": "ant design" }}
                      checked={isProjectProductDesign}
                      onChange={handleIsProjectProductDesign}
                    />
                    <span>{LABELS.IS_PRODUCT_DESIGN}</span>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {/* <Typography>Kart tasarımı bol içerikli olsun</Typography> */}
                    <span>{LABELS.MAKE_CARD_DESIGN_AS_BIG_IMAGES}</span>
                    <AntSwitch
                      defaultChecked
                      inputProps={{ "aria-label": "ant design" }}
                      checked={isCardDesignWithBigImage}
                      onChange={handleIsCardDesignWithBigImage}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span>{LABELS.IS_DISPLAY_ORDER_BY_MENU}</span>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isOrderbyMenuActive}
                        onChange={handleIsOrderbyMenuActive}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label=""
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <span>{LABELS.IS_DISPLAY_MAIN_MENU}</span>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isTopMenuActive}
                        onChange={handleIsTopMenuActive}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label=""
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    label={LABELS.MAIN_PAGE_NAME}
                    value={mainPageName}
                    onChange={(event) =>
                      handleMainPageNameChange(event.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <span style={{ paddingTop: "10px" }}>
                    {LABELS.LANGUAGE_SELECTION}
                  </span>
                  <FormControl
                    variant="standard"
                    style={{
                      marginLeft: "20px",
                      marginTop: "-7px",
                      fontSize: "14px",
                    }}
                  >
                    <Select
                      value={defaultLanguage}
                      onChange={handleLanguageChange}
                    >
                      <MenuItem value="">
                        <em>{LABELS.SELECT_PLEASE}</em>
                      </MenuItem>
                      <MenuItem value="tr">{LABELS.TURKISH}</MenuItem>
                      <MenuItem value="en">{LABELS.ENGLISH}</MenuItem>
                    </Select>
                  </FormControl>
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
              text="Page is successfully saved"
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
