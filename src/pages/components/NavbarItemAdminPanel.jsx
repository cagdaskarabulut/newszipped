"use client";

import { useSearchParams, usePathname } from "next/navigation";
import styles from "./NavbarItem.module.scss";
import LoadingFullPage from "../../components/reusableComponents/LoadingFullPage";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@mui/material";

export default function NavbarItemAdminPanel({ title, param }) {
  const [isLoadingFullPage, setIsLoadingFullPage] = useState(false);
  const router = useRouter();

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
          usePathname() === param
            ? styles.secondButtonStyle
            : styles.firstButtonStyle
        }
        onClick={() => goTarget(param)}
      >
        {title}
      </Link>
    </>
  );
}
