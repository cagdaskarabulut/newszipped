"use client";
import React, { useEffect, useState } from "react";
import { Autocomplete, MenuItem, Select, TextField } from "@mui/material";
import useLanguages from "../hooks/useLanguages";
const TagList = ({
  label,
  selectedTag,
  setSelectedTag,
  isRefreshingTagList,
  setIsRefreshingTagList,
}) => {
  const [allTagList, setAllTagList] = useState([]);
  const LABELS = useLanguages();
  useEffect(() => {
    fetch("/api/topic/list") // Updated fetch URL
      .then((res) => res.json())
      .then((data) => {
        setAllTagList(data?.topic_list?.rows); // Assuming the response structure might be similar
      });
    setIsRefreshingTagList(false);
  }, []);

  useEffect(() => {
    fetch("/api/topic/list") // Updated fetch URL
      .then((res) => res.json())
      .then((data) => {
        setAllTagList(data?.topic_list.rows); // Assuming the response structure might be similar
      });
    setIsRefreshingTagList(false);
  }, [isRefreshingTagList, setIsRefreshingTagList, selectedTag]);

  return (
    <div>
      <Autocomplete
        id="tags-standard"
        options={allTagList}
        getOptionLabel={(option) => option?.name || ""} // Consider updating the label
        isOptionEqualToValue={(option, value) => option.value === value.value}
        value={selectedTag}
        onChange={(event, newValue) => {
          setSelectedTag(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label={label || LABELS.SELECT_TAG} />
        )}
      />
    </div>
  );
};

export default TagList;
