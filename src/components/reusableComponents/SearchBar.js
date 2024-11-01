"use client";
import * as React from "react";
import styles from "./SearchBar.module.scss";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useLanguages from "../../hooks/useLanguages";

export default function SearchBar({ setIsLoadingFullPage }) {
  const LABELS = useLanguages();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (value) => {
    if (value) {
      setSearchValue(value);
    }
  };

  const searchAction = () => {
    setIsLoadingFullPage(true);
    if (searchValue) {
      const handler = setTimeout(() => {
        router.push("/?search=" + searchValue);
        setIsLoadingFullPage(false);
      }, 500);
      setSearchValue("");
      return () => {
        clearTimeout(handler);
      };
    }
  };

  return (
    <div className={styles.SearchBoxStyle}>
      {/* <h1> Test </h1> */}
      <TextField
        value={searchValue}
        // onChange={(path, value) => handleInputChange(path, value)}
        onChange={(event) => {
          handleInputChange(event.target.value);
        }}
        onKeyPress={(ev) => {
          if (ev.key === "Enter") {
            searchAction();
            ev.preventDefault();
          }
        }}
        label={LABELS?.SEARCH || ""}
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
