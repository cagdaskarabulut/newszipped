"use client";
import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./CategoryMenu.module.scss";
import useLanguages from "../../hooks/useLanguages";
import useCommercials from "../../hooks/useCommercials";

const CategoryMenu = ({ activePageName }) => {
  const LABELS = useLanguages();
  const router = useRouter();
  const [menuList, setMenuList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { commercials, isMobile } = useCommercials();

  useEffect(() => {
    fetch(`/api/topic/menu_list`)
      .then((res) => res.json())
      .then((data) => {
        setMenuList(data?.list?.rows);
      });
  }, []);

  const isActiveMenu = (objectName) => {
    if (
      activePageName === "" &&
      (objectName === "All" || objectName === "Hepsi")
    ) {
      return true;
    } else if (activePageName === objectName) {
      return true;
    } else {
      return false;
    }
  };

  const goPage = (objectName) => {
    if (objectName === "All" || objectName === "Hepsi") {
      router.push("/");
    } else {
      router.push("/?search=" + objectName);
    }
  };

  // Dinamik filtreleme fonksiyonu
  const filteredMenuList = menuList?.filter((object) =>
    object.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.MainContainerStyle}>
      {/* Arama kutusu */}
      {isMobile && (
        // Genel Filtre
        <></>
      )}

      {!isMobile && (
        <TextField
          className={styles.FilterTextboxStyle}
          label={LABELS.FILTER_TOPICS}
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Arama terimi güncelleniyor
        />
      )}

      <List className={styles.ListContainerStyle}>
        <ListItem key={"All"} disablePadding style={{ maxWidth: "100%" }}>
          <ListItemButton
            style={{ maxWidth: "100%" }}
            className={`${styles.menuItem} ${
              isActiveMenu(LABELS.ALL) ? styles.active : ""
            }`}
            onClick={() => goPage(LABELS.ALL)}
          >
            <ListItemText primary={LABELS.ALL} />
          </ListItemButton>
        </ListItem>

        {/* Filtrelenen menü listesi */}
        {filteredMenuList?.map((object) => (
          <ListItem
            key={object.id}
            disablePadding
            style={{ maxWidth: "100%", paddingRight: "8px" }}
          >
            <ListItemButton
              style={{ maxWidth: "100%" }}
              className={`${styles.menuItem} ${
                isActiveMenu(object.name) ? styles.active : ""
              }`}
              onClick={() => goPage(object.name)}
            >
              {object?.image && (
                <ListItemIcon>
                  <Image
                    src={object?.image}
                    alt={"img_" + object?.image}
                    objectFit="contain"
                    width={32}
                    height={32}
                    style={{ borderRadius: "50%" }}
                  />
                </ListItemIcon>
              )}
              <ListItemText primary={object.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CategoryMenu;
