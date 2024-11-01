"use client";
import React, { useEffect, useState } from "react";

import { Autocomplete, MenuItem, Select, TextField } from "@mui/material";

const UrlList = ({
  label,
  selectedUrl,
  setArticle,
  setSelectedUrl,
  isRefreshingUrlList,
  setIsRefreshingUrlList,
  isSingleSelection,
  activeStyle,
  activeInputStyle,
  isDisabled,
}) => {
  const [allUrlList, setAllUrlList] = useState([]);
  // const timestamp = Date.now(); // This would be the timestamp you want to format

  useEffect(() => {
    fetch("/api/article/list_all_url")
      .then((res) => res.json())
      .then((data) => {
        setAllUrlList(data?.article_url_list?.rows);
      });
    setIsRefreshingUrlList(false);
  }, []);

  useEffect(() => {
    fetch("/api/article/list_all_url")
      .then((res) => res.json())
      .then((data) => {
        setAllUrlList(data?.article_url_list.rows);
      });
    setIsRefreshingUrlList(false);
  }, [isRefreshingUrlList, setIsRefreshingUrlList, selectedUrl]);

  async function getArticle(article) {
    const res = await fetch("/api/article/" + article);
    return res.json();
  }

  const handleChange = async (newValue) => {
    setSelectedUrl(newValue);
    let article = await getArticle(newValue.url);
    setArticle(article?.article_list?.rows[0]);
  };

  const handleSelectChange = async (event) => {
    setSelectedUrl(event.target.value);
    let article = await getArticle(event.target.value);
    setArticle(article?.article_list?.rows[0]);
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
          {allUrlList?.map((urlItem) => (
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
          options={allUrlList}
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
          options={allUrlList}
          getOptionLabel={(option) => option?.url}
          // onChange={(event, newValue) => {
          //   setSelectedUrl(newValue);
          // }}
          onChange={(event, newValue) => handleChange(newValue)}
          renderInput={(params) => (
            <TextField {...params} style={activeInputStyle} label={label} />
          )}
        />
      )}
    </div>
  );
};

export default UrlList;
