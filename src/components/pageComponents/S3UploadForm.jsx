"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import Button from "@mui/material/Button";
import { Input } from "@mui/material";
import styles from "./S3UploadForm.module.scss";

const UploadForm = ({
  titleImageUrl,
  setTitleImageUrl,
  setIsLoading,
  folderPath,
}) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderPath", folderPath);

    try {
      const response = await fetch("/api/s3-upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setUploading(false);
      setIsLoading(false);
      setTitleImageUrl(
        "https://karabulut-storage.s3.amazonaws.com/" +
          process.env.PROJECT_SITE_NAME +
          "/" +
          (folderPath ? folderPath + "/" : "") +
          file.name
      );
      setFile(null);
    } catch (error) {
      setUploading(false);
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          name="file"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
          hidden
        />
        <Button
          variant="contained"
          type="submit"
          style={{ marginLeft: "10px" }}
          disabled={!file || uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      </form>
      {titleImageUrl && (
        <>
          <br />
          <h3 className={styles.subTitleStyle}>Yüklenen Resim</h3>
          <div className={styles.ArticleImageContainerStyle}>
            <Image
              src={titleImageUrl}
              fill={true}
              objectFit="contain"
              alt={"img_" + titleImageUrl}
            />
          </div>
        </>
      )}
    </>
  );
};

export default UploadForm;
