import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import MyGrid from "../toolComponents/MyGrid";

export default function LoadingSkeletonArticle({ isLoading }) {
  const Content = () => {
    return (
      <>
        <Skeleton animation="wave" height={40} width="100%" />
        <Skeleton
          animation="wave"
          height={40}
          width="100%"
          style={{ marginTop: "20" }}
        />
        <Skeleton animation="wave" height={20} width="100%" />
        <Skeleton animation="wave" height={20} width="100%" />
        <Skeleton animation="wave" height={20} width="100%" />
        <Skeleton animation="wave" height={20} width="100%" />
        <Skeleton animation="wave" height={20} width="100%" />
        <Skeleton animation="wave" height={20} width="100%" />
        <Skeleton animation="wave" height={20} width="100%" />
        <Skeleton animation="wave" height={20} width="100%" />
      </>
    );
  };

  if (isLoading) {
    return <MyGrid isOneFullContent leftContent={<Content />} />;
  }
}
