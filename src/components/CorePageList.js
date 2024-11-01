"use client";
import React, { useEffect, useState } from "react";

import { Autocomplete, MenuItem, Select, TextField } from "@mui/material";

const CorePageList = ({
  label,
  selectedUrl,
  setCorePage,
  setSelectedUrl,
  isSingleSelection,
  activeStyle,
  activeInputStyle,
  isDisabled,
}) => {
  const [allCorePageList, setAllCorePageList] = useState([]);

  useEffect(() => {
    fetch("/api/core-page/list_all_url")
      .then((res) => res.json())
      .then((table) => {
        setAllCorePageList(table?.data?.rows);
      });
  }, []);

  useEffect(() => {
    fetch("/api/core-page/list_all_url")
      .then((res) => res.json())
      .then((table) => {
        setAllCorePageList(table?.data.rows);
      });
  }, [selectedUrl]);

  async function getCorePage(corePage) {
    const res = await fetch("/api/corePage/" + corePage);
    return res.json();
  }

  const handleChange = async (newValue) => {
    setSelectedUrl(newValue);
    let article = await getCorePage(newValue.url);
    setCorePage(article?.data?.rows[0]);
  };

  const handleSelectChange = async (event) => {
    setSelectedUrl(event.target.value);
    let article = await getCorePage(event.target.value);
    setCorePage(article?.data?.rows[0]);
  };

  return (
    <div>
      {isDisabled && (
        <Select
          id="demo-simple-select"
          value={selectedUrl}
          onChange={handleSelectChange}
          style={{ width: "100%" }}
        >
          <MenuItem value="" key="emptySelect_id">
            Select
          </MenuItem>
          {allCorePageList?.map((urlItem) => (
            <MenuItem value={urlItem.url} key={urlItem.url + "_id"}>
              {urlItem.url}
            </MenuItem>
          ))}
        </Select>
      )}

      {!isDisabled && isSingleSelection && (
        <Autocomplete
          freeSolo
          disableClearable
          disabled
          style={activeStyle}
          id="tags-standard"
          options={allCorePageList}
          getOptionLabel={(option) => option?.url}
          onChange={(event, newValue) => handleChange(newValue)}
          renderInput={(params) => (
            <TextField {...params} style={activeInputStyle} label={label} />
          )}
        />
      )}
      {!isDisabled && !isSingleSelection && (
        <Autocomplete
          multiple
          style={activeStyle}
          id="tags-standard"
          options={allCorePageList}
          getOptionLabel={(option) => option?.url}
          onChange={(event, newValue) => handleChange(newValue)}
          renderInput={(params) => (
            <TextField {...params} style={activeInputStyle} label={label} />
          )}
        />
      )}
    </div>
  );
};

export default CorePageList;
