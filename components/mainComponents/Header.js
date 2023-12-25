import styles from "./Header.module.scss";
import { useRouter } from "next/navigation";
import {
  Autocomplete,
  Chip,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { wait } from "/utils/CommonUtils";
import { Backdrop, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MyGrid from "../toolComponents/MyGrid";
import { Permanent_Marker } from "@next/font/google";
import useWindowSize from "@rooks/use-window-size";
import { MOBILE_SCREEN_SIZE } from "../../constants/GeneralConstants";
import Image from "next/image";

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Header({ middleContent }) {
  const { innerWidth } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowSearchBox, setIsShowSearchBox] = useState(false);

  useEffect(() => {
    if (innerWidth === null) {
      setIsMobile(false);
      setIsShowSearchBox(true);
    } else {
      setIsMobile(innerWidth < MOBILE_SCREEN_SIZE);
      setIsShowSearchBox(!(innerWidth < MOBILE_SCREEN_SIZE));
    }
  }, [innerWidth]);

  async function selectAction(event, newValue) {
    setIsLoading(true);
    let selectedSkin = null;
    // pageList?.map((option) =>
    //   option.searchField?.toLowerCase() == newValue?.toLowerCase()
    //     ? (selectedSkin = option)
    //     : ""
    // );
    if (selectedSkin !== null) {
      router.push("/" + selectedSkin.newPageUrl);
    }
    await wait(200);
    setIsLoading(false);
  }

  function goHomePage() {
    router.push("/");
  }

  return (
    <div className={styles.PanelContainerStyle}>
      <Container className={styles.header} maxWidth={100}>
        <MyGrid
          forHeader={true}
          leftContent={
            <>
              <h1
                className={styles.LogoStyle}
                style={{ marginTop: "5px" }}
              >
                <Image
                  src={"images/logo.png"}
                  width={isMobile ? 48 : 64}
                  height={isMobile ? 48 : 64}
                  onClick={() => goHomePage()}
                />
              </h1>
            </>
          }
          middleContent={
            <div style={{ height: "35px", marginTop: "15px" }}>
              {middleContent}
            </div>
          }
          rightContent={
            <>
              <div className={styles.SearchBoxStyle}>
                <IconButton
                  className={styles.SearchBoxIconStyle}
                  aria-label="delete"
                  size="large"
                  style={{
                    display: isShowSearchBox ? "none" : "",
                  }}
                >
                  <SearchIcon
                    fontSize="inherit"
                    onClick={() => setIsShowSearchBox(true)}
                  />
                </IconButton>

                <Autocomplete
                  style={{
                    opacity: !isShowSearchBox ? 0 : 1,
                    transition: "opacity .3s ease-in-out",
                    animation: "ease-in-out",
                    display: !isShowSearchBox ? "none" : "",
                    height: "35px",
                    marginTop: "10px",
                  }}
                  id="free-solo-demo"
                  freeSolo
                  onChange={(event, newValue) => selectAction(event, newValue)}
                  multiple={false}
                  fullWidth={true}
                  clearOnBlur={true}
                  // options={pageList?.map((option) => option)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search"
                      size="small"
                      fullWidth
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <InputAdornment position="end">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </div>
            </>
          }
        />

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </div>
  );
}
