"use client";

// import Link from 'next/link';

import { useSearchParams } from "next/navigation";
import styles from "./NavbarItem.module.scss";
import LoadingFullPage from "../../components/reusableComponents/LoadingFullPage";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";

export default function NavbarItemOrderBy({
  title,
  name,
  url,
  size,
  isShowOrderByIcon,
}) {
  const searchParams = useSearchParams();
  const orderby = searchParams.get("orderby") || "create_date";
  const [isLoadingFullPage, setIsLoadingFullPage] = useState(false);
  const router = useRouter();

  const goTarget = (url) => {
    setIsLoadingFullPage(true);
    const handler = setTimeout(() => {
      router.push(url);
      setIsLoadingFullPage(false);
    }, 200);
    return () => {
      clearTimeout(handler);
    };
  };

  return (
    <>
      <LoadingFullPage isLoading={isLoadingFullPage} />

      <Link
        key={"NavbarItemId_" + name}
        className={
          orderby === name ? styles.secondButtonStyle : styles.firstButtonStyle
        }
        onClick={() => goTarget(url)}
      >
        <span
          className={
            size === "small" ? styles.ListItemStyleSmall : styles.ListItemStyle
          }
        >
          {title}

          {isShowOrderByIcon && <SwapVertIcon fontSize="xxx" />}
        </span>
      </Link>
    </>
  );
}
