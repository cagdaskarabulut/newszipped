"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "./NavbarItem.module.scss";
import LoadingFullPage from "../../components/reusableComponents/LoadingFullPage";
import { useState } from "react";
import { Icon, Link, ListItemText } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";

export default function NavbarItem({ title, param, size, isShowOrderByIcon }) {
  const router = useRouter();
  const pathname = usePathname();
  const activePageName = pathname?.split("/").pop() || "/";
  const isActive = activePageName === param;

  const [isLoadingFullPage, setIsLoadingFullPage] = useState(false);

  const goTarget = (param) => {
    setIsLoadingFullPage(true);
    const handler = setTimeout(() => {
      router.push(param);
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
        key={"NavbarItemId_" + param}
        className={
          isActive ? styles.secondButtonStyle : styles.firstButtonStyle
        }
        onClick={() => goTarget(param)}
      >
        <span
          key={"NavbarItemSpanId_" + param}
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
